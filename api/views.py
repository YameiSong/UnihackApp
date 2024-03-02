from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tag, User, TravelPlan, Ridesharing
from .serializers import TagSerializer, RideSharingSerializer, TravelPlanSerializer
from .transport_api import TransportAPI
from typing import List
from datetime import datetime
import json

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
                'user_id': 'string',
                'tag_name': 'string',
                'address': 'string',
                     },
            'description': 'Creates a new tag'
        },
        {
            'Endpoint': '/tag/',
            'method': 'DELETE',
            'body': {
                'user_id': 'string',
                'tag_name': 'string'
                },
            'description': 'Deletes an exiting tag'
        },
        {
            'Endpoint': '/tag/',
            'method': 'GET',
            'body': {'userID': 'string'},
            'description': 'Returns all tags'
        },
        {
            'Endpoint': '/travelplan/',
            'method': 'POST',
            'body': {
                'user_id': 'string',
                'origin_station': 'string',
                'destination_station': 'string',
                'arrival_time': 'string'
                },
            'description': 'Creates a travel plan'
        },
        {
            'Endpoint': '/travelplan/',
            'method': 'GET',
            'body': {'user_id': 'string'},
            'description': 'Returns a travel plan'
        },
        {
            'Endpoint': '/trip/',
            'method': 'GET',
            'body': {'user_id': 'string'},
            'description': 'Returns today\'s suggested routes and ride sharing info'
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
    user_id = request.data.get('user_id')
    # get user
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        tags: List[Tag] = Tag.objects.filter(user_id=user)
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = TagSerializer(data=request.data)

        if serializer.is_valid():
            tag:Tag = serializer.create(serializer.validated_data)
            tag.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        tagName = request.data.get('tag_name')
        tag = Tag.objects.get(user_id=user, tag_name=tagName)
        tag.delete()
        return Response(f'Tag {tagName} was deleted', status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def handleTravelPlan(request):
    if request.method == 'GET':
        user_id = request.data.get('user_id')
        # get user
        try:
            user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        travel_plans: List[TravelPlan] = TravelPlan.objects.filter(user_id=user)
        serializer = TravelPlanSerializer(travel_plans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        # Fetch request data
        user_id = request.data.get('user_id')
        origin_station_name = request.data.get('origin_station')
        destination_station_name = request.data.get('destination_station')
        arrival_time = request.data.get('arrival_time')

        # Get the station ID using TransportAPI
        origin_id = transapi.query_stop(origin_station_name)
        destination_id = transapi.query_stop(destination_station_name)

        if not origin_id or not destination_id:
            return Response({'error': 'Invalid station name'}, status=status.HTTP_400_BAD_REQUEST)

        # get user
        try:
            user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create a TravelPlan object and save it to the database
        travel_plan = TravelPlan.objects.create(
            user_id=user,
            event_name='',
            expected_arrival_time=arrival_time,
            time_to_departure_platform=10,
            departure_address=origin_station_name,
            departure_stop_id=origin_id,
            arrival_address=destination_station_name,
            arrival_stop_id=destination_id,  
            transport_mode=''  
        )

        travel_plan.save()

        return Response({'message': 'Travel plan created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def handleTrip(request):
    user_id = request.data.get('user_id')
    # get user
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    travel_plans: List[TravelPlan] = TravelPlan.objects.filter(user_id=user)
    trips = []
    for travel_plan in travel_plans:
        info = transapi.query_trip(travel_plan.departure_stop_id, 
                            travel_plan.arrival_stop_id, 
                            travel_plan.expected_arrival_time)
        trip = {}
        trip['timeToDeparturePlatform'] = travel_plan.time_to_departure_platform
        trip['journeys'] = []
        for journey in info:
            try:
                cleared_journey = {
                    'transportation': {
                        'name': journey['transportation'].get('name', journey['transportation']['product']['name']),
                        'description': journey['transportation'].get('description', ''),
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
            except KeyError as e:
                print('KeyError:', e)
                print(json.dumps(journey, indent=4))
        trips.append(trip)

        info = Ridesharing.objects.last()
        serializer = RideSharingSerializer(info, many=False)
    return JsonResponse({
        'trips': trips,
        'rideSharing': serializer.data
        }, status=status.HTTP_200_OK)

@api_view(['GET'])
def handleLogin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    request.session['username'] = username
    try:
        user = User.objects.get(username=username,password=password)
        return JsonResponse({
            'status': 'success',
            'userID': user.user_id
            }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return JsonResponse({
            'status': 'fail',
            'userID': -1
            }, status=status.HTTP_200_OK)

@api_view(['PUT'])
def HandleRideShaing(request):
    if request.method == 'PUT':
        body = request.data
        serializer = RideSharingSerializer(data=body)
        if serializer.is_valid():
            sharing = serializer.create(serializer.validated_data)
            sharing.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
