from urllib import request
from django.shortcuts import render, redirect
from docutils.nodes import status

from .forms import UserForm
from .models import TravelPlan, Tag
from django.http import HttpResponse
from django.utils import timezone
from transport_api import TransportAPI
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TravelPlanSerializer, RideSharingSerializer

api = TransportAPI()
origin_stop_id = api.query_stop('Redfern') # string
destination_stop_id = api.query_stop('Randwick') # string
arrival_time = '2200' # HHMM format string
trip = api.query_trip(origin_stop_id, destination_stop_id, arrival_time) # dict

# Create your views here.


@api_view(['POST'])
def handleLogin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    request.session['username'] = username
    if User.objects.filter(username=username,password=password).exists():
        return Response('false')
    else:
        return Response('success')



#到达时间  2个tag name和其真实地址
#2个调用地址 获取地址对应的id
#全部存到travelplan数据库
@api_view(['POST'])
def handleTravelPlan(request):
    user = request.session.get('username')
    depart_address = request.data.get('depart_address')
    depart_id = TransportAPI(depart_address)
    request.session['depart_id'] = depart_id
    arrive_address = request.session.get('arrive_address')
    arrive_id = TransportAPI(arrive_address)
    request.session['arrive_id'] = arrive_id
    arrive_tag_name = request.session.get('arrive_tag_name')
    travel_plan = TravelPlan.objects.create(user = user,origin_name = depart_address,origin_id = depart_id, origin_tag = depart_tag_name, dest_address = arrive_address, dest_id = arrive_id, dest_tag = arrive_tag_name)
    travel_plan.save()
    return Response('success')

#别名 和 地址传入数据库
@api_view(['POST'])
def handleTag(request):
    arrive_address = request.data.get('arrive_address')
    user = request.session.get('username')
    arrive_tag_name = request.data.get('arrive_tag_name')
    request.session['arrive_tag_name'] = arrive_tag_name
    request.session['arrive_address'] = arrive_address
    Tag.objects.create(user=user, tag_name=arrive_tag_name, address=arrive_address)
    return Response('success')


#monitor：
#筛选今天的plan
#2个ID和到达时间里面调用时间api
#更新到达时间
@api_view(['GET'])
def monitor(request):
    today = timezone.now().date()
    today_plans = TravelPlan.objects.filter(date__date=today)
    depart_id = request.session.get('depart_id')
    arrive_id = request.session.get('arrive_id')
    for plan in today_plans:
        plan.expected_arrival_time = api(depart_id,arrive_id)
        plan.save()
    return Response('success')


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


rideshare
@api_view('PUT')
def HandleRideShaing(request):
    body = request.data
    serializer = RideSharingSerializer(data=body)
    if serializer.is_valid():
        sharing = serializer.create(serializer.validated_data)
        sharing.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
