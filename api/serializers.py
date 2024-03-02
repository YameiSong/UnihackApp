from rest_framework.serializers import ModelSerializer, ALL_FIELDS
from .models import Tag, TravelPlan, User, Trip

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ALL_FIELDS

class TravelPlanSerializer(ModelSerializer):
    class Meta:
        model = TravelPlan
        fields = ALL_FIELDS

class TripSerializer(ModelSerializer):
    class Meta:
        model = Trip
        fields = ALL_FIELDS

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ALL_FIELDS