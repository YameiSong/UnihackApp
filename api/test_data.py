import os
import django
from django.utils import timezone
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import User, TravelPlan, Tag, Ridesharing, Notification

# User1 
user1 = User(username='user1', password='password1', email='user1@example.com')
user1.save()

# TravelPlan
travel_plan1 = TravelPlan(
    user_id=user1,
    date=timezone.now(),
    event_name='Event 1',
    expected_arrival_time=timezone.make_aware(datetime.datetime(2024, 3, 2, 10, 30)),
    time_to_departure_platform=10,
    departure_address='123 Main St',
    departure_stop_id=1,
    arrival_address='456 Elm St',
    arrival_stop_id=2,
    transport_mode='Bus'
)
travel_plan1.save()

# Tag
tag1 = Tag(user=user1, tag_name='Tag 1', address='789 Pine St')
tag1.save()

# Ridesharing
ridesharing1 = Ridesharing(
    userid=user1.user_id,
    departure_address='123 Main St',
    arrival_address='456 Elm St',
    leave_before=timezone.now() + datetime.timedelta(minutes=30),
    contact='123-456-7890'
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
    date=timezone.now(),
    event_name='Event 2',
    expected_arrival_time=timezone.make_aware(datetime.datetime(2024, 3, 3, 15, 00)),
    time_to_departure_platform=20,
    departure_address='789 Pine St',
    departure_stop_id=3,
    arrival_address='101 Maple Ave',
    arrival_stop_id=4,
    transport_mode='Train'
)
travel_plan2.save()

# Tag
tag2 = Tag(user=user2, tag_name='Tag 2', address='101 Maple Ave')
tag2.save()

# Ridesharing
ridesharing2 = Ridesharing(
    userid=user2.user_id,
    departure_address='789 Pine St',
    arrival_address='101 Maple Ave',
    leave_before=timezone.now() + datetime.timedelta(minutes=45),
    contact='987-654-3210'
)
ridesharing2.save()

# Notification
notification2 = Notification(message='Notification 2', is_read=False)
notification2.save()
