from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tag
from .serializers import TagSerializer

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

@api_view(['GET'])
def handleTrip(request):
    pass

@api_view(['GET'])
def handleLogin(request):
    pass