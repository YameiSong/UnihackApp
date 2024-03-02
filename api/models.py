from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField()

class TravelPlan(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    event_name = models.CharField(max_length=100)
    expected_arrival_time = models.DateTimeField()
    time_to_departure_platform = models.IntegerField()  # unit: minute
    departure_address = models.CharField(max_length=255)
    departure_stop_id = models.IntegerField()
    arrival_address = models.CharField(max_length=255)
    arrival_stop_id = models.IntegerField()
    transport_mode = models.CharField(max_length=100)

class Tag(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)

# trip= {
#     'timeToDeparturePlatform': int,
#     'journeys': [
#         {
#             'transportation': {
#                 'name': str,
#                 'description': str,
#             },
#             'departureStop': str,
#             'estimatedDepartureTime': str,
#             'arrivalStop': str,
#             'estimatedArrivalTime': str,
#             'expectedArrivalTime': str,
#             'delay': int,
#             'stopSequence': List[str]
#         }
#     ]
# }
# class Trip(models.Model):
#     travel_plan = models.ForeignKey(TravelPlan, on_delete=models.CASCADE)
#     updated_at = models.DateTimeField()
#     estimated_travel_time = models.DateTimeField()
#     optimized_route_details = models.CharField(max_length=255)
#     departure_stop = models.CharField(max_length=255)
#     arrival_stop = models.CharField(max_length=255)

class Notification(models.Model):
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class Ridesharing(models.Model):
    userid = models.IntegerField()
    departure_address = models.CharField(max_length=255)
    arrival_address = models.CharField(max_length=255)
    leave_before = models.DateTimeField()
    contact = models.CharField(max_length=255)
