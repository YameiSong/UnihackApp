from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('api/tag', views.handleTag, name="handle tag"),
    path('api/travelplan', views.handleTravelPlan, name="handle travel plan"),
    path('api/trip', views.handleTrip, name="handle trip"),
    path('api/login', views.handleLogin, name="handle log in"),
]
    
