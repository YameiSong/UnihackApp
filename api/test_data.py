import os
import django
from django.utils import timezone
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import User, TravelPlan, Tag, Ridesharing, Notification

#test

# User1 
user1 = User(username='user1', password='password1', email='user1@example.com')
user1.save()

# TravelPlan
travel_plan1 = TravelPlan(
    user_id=user1,
    event_name='Event 1',
    expected_arrival_time='2200',
    time_to_departure_platform=10,
    departure_address='Redfern',
    departure_stop_id='10101421',
    arrival_address='Randwick',
    arrival_stop_id='10101612',
    transport_mode='Bus'
)
travel_plan1.save()

# Tag
tag1 = Tag(user_id=user1, tag_name='Home', address='Redfern')
tag1.save()

# Ridesharing
ridesharing1 = Ridesharing(
    user_id=user1,
    departure_address='Redfern',
    arrival_address='Randwick',
    leave_before='1204',
    contact='12-456-7890'
)
ridesharing1.save()

# Notification
notification1 = Notification(message='Notification 1', is_read=False)
notification1.save()

#-------------------------------------#

# User2
user2 = User(username='user2', password='password2', email='user2@example.com')
user2.save()

# TravelPlan
travel_plan2 = TravelPlan(
    user_id=user2,
    event_name='Event 2',
    expected_arrival_time='1500',
    time_to_departure_platform=20,
    departure_address='Redfern',
    departure_stop_id='10101421',
    arrival_address='Randwick',
    arrival_stop_id='10101612',
    transport_mode='Train'
)
travel_plan2.save()

# Tag
tag2 = Tag(user_id=user2, tag_name='Tag 2', address='Randwick')
tag2.save()

# Ridesharing
ridesharing2 = Ridesharing(
    user_id=user2,
    departure_address='Redfern',
    arrival_address='Randwick',
    leave_before='1300',
    contact='987-654-210'
)
ridesharing2.save()

# Notification
notification2 = Notification(message='Notification 2', is_read=False)
notification2.save()
