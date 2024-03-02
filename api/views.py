from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tag, TravelPlan
from .serializers import TagSerializer
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
            'body': {'body': ''},
            'description': 'Creates a travel plan'
        },
        {
            'Endpoint': '/trip/',
            'method': 'GET',
            'body': None,
            'description': 'Returns today\'s suggested routes'
        },
        {
            'Endpoint': '/login/',
            'method': 'GET',
            'body': {'body': ''},
            'description': 'Returns user id (>= 0) if user login is succeful. If failed, returns -1'
        },
    ]

    return Response(routes)

@api_view(['PUT', 'DELETE'])
def handleTag(request):
    body = request.data

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

@api_view(['POST'])
def handleTravelPlan(request):
    pass

@api_view(['GET'])
def handleTrip(request):
    body = request.data
    userId = body['userId']
    travel_plans: List[TravelPlan] = TravelPlan.objects.filter(user_id=userId)
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
    serializer = TripSerializer(trips, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def handleLogin(request):
    pass