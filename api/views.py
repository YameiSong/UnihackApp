from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tag, User, TravelPlan
from .serializers import TagSerializer, RideSharingSerializer, TravelPlanSerializer
from .transport_api import TransportAPI
from typing import List
from datetime import datetime

transapi = TransportAPI()

def parse_time(time_str):
    return datetime.strptime(time_str, '%Y-%m-%dT%H:%M:%SZ')

def compute_delay_in_minutes(trip):
    origin_departure_planned = parse_time(trip['origin']['departureTimePlanned'])
    origin_departure_estimated = parse_time(trip['origin']['departureTimeEstimated'])

    delay = (origin_departure_estimated - origin_departure_planned).total_seconds() / 60

    return delay

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/tag/',
            'method': 'PUT',
            'body': {
                'tagName': 'string',
                'address': 'string',
                'username': 'string',
                     },
            'description': 'Creates a new tag'
        },
        {
            'Endpoint': '/tag/',
            'method': 'DELETE',
            'body': {'tagName': 'string'},
            'description': 'Deletes an exiting tag'
        },
        {
            'Endpoint': '/travelplan/',
            'method': 'POST',
            'body': {
                'userID': 'string',
                'originStation': 'string',
                'destinationStation': 'string',
                'arrivalTime': 'string'
                },
            'description': 'Creates a travel plan'
        },
        {
            'Endpoint': '/travelplan/',
            'method': 'GET',
            'body': {'userID': 'string'},
            'description': 'Returns a travel plan'
        },
        {
            'Endpoint': '/trip/',
            'method': 'GET',
            'body': {'userID': 'string'},
            'description': 'Returns today\'s suggested routes'
        },
        {
            'Endpoint': '/login/',
            'method': 'GET',
            'body': {
                'username': 'string',
                'password': 'string'
                     },
            'description': 'Returns user id (>= 0) if user login is succeful. If failed, returns -1'
        },
    ]

    return Response(routes)

@api_view(['PUT', 'DELETE', 'GET'])
def handleTag(request):
    body = request.data

    if request.method == 'GET':
        tags: List[Tag] = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = TagSerializer(data=body)

        if serializer.is_valid():
            tag:Tag = serializer.create(serializer.validated_data)
            tag.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        tagName = body['tagName']
        tag = Tag.objects.get(tag_name=tagName)
        tag.delete()
        return Response(f'Tag {tagName} was deleted')

@api_view(['GET', 'POST'])
def handleTravelPlan(request):
    if request.method == 'GET':
        user_id = request.data.get('userID')
        travel_plans: List[TravelPlan] = TravelPlan.objects.filter(user_id=user_id)
        serializer = TravelPlanSerializer(travel_plans, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        # Fetch request data
        user_id = request.data.get('userID')
        origin_station_name = request.data.get('originStation')
        destination_station_name = request.data.get('destinationStation')
        arrival_time = request.data.get('arrivalTime')

        # Get the station ID using TransportAPI
        origin_id = transapi.query_stop(origin_station_name)
        destination_id = transapi.query_stop(destination_station_name)

        if not origin_id or not destination_id:
            return Response({'error': 'Invalid station name'}, status=status.HTTP_400_BAD_REQUEST)

        # get user
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create a TravelPlan object and save it to the database
        travel_plan = TravelPlan.objects.create(
            user=user,
            event_name='',
            expected_arrival_time=datetime.strptime(arrival_time, '%H:%M'),
            time_to_departure_platform=10,
            departure_address=origin_station_name,
            departure_stop_id='',
            arrival_address=destination_station_name,
            arrival_stop_id='',  
            transport_mode=''  
        )

        travel_plan.save()

        return Response({'message': 'Travel plan created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def handleTrip(request):
    body = request.data
    userID = body['userID']
    travel_plans: List[TravelPlan] = TravelPlan.objects.filter(user_id=userID)
    trips = []
    for travel_plan in travel_plans:
        info = transapi.query_trip(travel_plan.departure_stop_id, 
                            travel_plan.arrival_stop_id, 
                            travel_plan.expected_arrival_time.strftime('%H%M'))
        trip = {}
        trip['timeToDeparturePlatform'] = travel_plan.time_to_departure_platform
        trip['journeys'] = []
        for journey in info:
            cleared_journey = {
                'transportation': {
                    'name': journey['transportation']['number'],
                    'description': journey['transportation']['description'],
                },
                'departureStop': journey['origin']['name'],
                'estimatedDepartureTime': journey['origin']['departureTimeEstimated'],
                'arrivalStop': journey['destination']['name'],
                'estimatedArrivalTime': journey['destination']['arrivalTimeEstimated'],
                'expectedArrivalTime': travel_plan.expected_arrival_time,
                'delay': compute_delay_in_minutes(journey),
                'stopSequence': [stop['name'] for stop in journey['stopSequence']]
            }
            trip['journeys'].append(cleared_journey)
        trips.append(trip)
    return JsonResponse(trips)

@api_view(['GET'])
def handleLogin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    request.session['username'] = username
    try:
        user = User.objects.get(username=username,password=password)
        return JsonResponse({
            'status': 'success',
            'userID': user.pk
            })
    except User.DoesNotExist:
        return JsonResponse({
            'status': 'fail',
            'userID': -1
            })

@api_view(['PUT'])
def HandleRideShaing(request):
    body = request.data
    serializer = RideSharingSerializer(data=body)
    if serializer.is_valid():
        sharing = serializer.create(serializer.validated_data)
        sharing.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
