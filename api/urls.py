from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('tag/', views.handleTag, name="handle tag"),
    path('travelplan/', views.handleTravelPlan, name="handle travel plan"),
    path('trip/', views.handleTrip, name="handle trip"),
    path('login/', views.handleLogin, name="handle log in"),
    path('handleridesharing/', views.HandleRideShaing, name="handle ride shaing")
]
