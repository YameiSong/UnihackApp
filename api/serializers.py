from rest_framework.serializers import ModelSerializer, ALL_FIELDS
from .models import Tag

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ALL_FIELDS