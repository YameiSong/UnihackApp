from django.urls import path
from . import views

urlpatterns = [
    path('home/', views., name='homepage')
    path('home/user/login', views.login, name='user_login')
]

