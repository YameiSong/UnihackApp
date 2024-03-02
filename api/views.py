from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tag, User
from .serializers import TagSerializer, RideSharingSerializer
from .transport_api import TransportAPI

transapi = TransportAPI()

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
            'body': {'body': ''},
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

@api_view(['POST'])
def handleTravelPlan(request):
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
        date=timezone.now(),
        event_name='',
        expected_arrival_time=datetime.datetime.strptime(arrival_time, '%H:%M'),
        time_to_departure_platform=10,
        departure_address=origin_station_name,
        departure_stop_id='',
        arrival_address=destination_station_name,
        arrival_stop_id='',  
        transport_mode=''  
    )

    return Response({'message': 'Travel plan created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def handleLogin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    request.session['username'] = username
    if User.objects.filter(username=username,password=password).exists():
        return Response('false')
    else:
        return Response('success')

@api_view('PUT')
def HandleRideShaing(request):
    body = request.data
    serializer = RideSharingSerializer(data=body)
    if serializer.is_valid():
        sharing = serializer.create(serializer.validated_data)
        sharing.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
