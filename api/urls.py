from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('api/tag', views.handleTag, name="handle tag"),
]