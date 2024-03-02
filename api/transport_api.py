import requests
from dotenv import load_dotenv
import os
import json
from datetime import date
from typing import Optional

load_dotenv()

class TransportAPI:
    def __init__(self) -> None:
        api_key = os.getenv("API_KEY")

        self.endpoint = "https://api.transport.nsw.gov.au/v1/tp/"
        self.header = {
            'Authorization': f'apikey {api_key}',
        }

    def query_stop(self, name: str) -> Optional[str]:
        stop_finder_call = 'stop_finder'

        stop_finder_params = {
            'outputFormat': 'rapidJSON',
            'type_sf': 'any',
            'name_sf': name,
            'coordOutputFormat': 'EPSG:4326',
        }

        response = requests.get(self.endpoint+stop_finder_call, 
                                headers=self.header, 
                                params=stop_finder_params)
        
        if response.status_code == 200:
            data = response.json()
            data['locations'].sort(key=lambda x: x["matchQuality"], reverse=True)
            stop_info = None
            for info in data['locations']:
                if info['type'] == 'stop':
                    stop_info = info
                    break
            if not stop_info:
                print(f"Error: {name} is not a valid stop name")
            return stop_info['properties']['stopId']
        else:
            print(f"Error: {response.status_code, json.dumps(response.json(), indent=4)}")  

    def query_trip(self, origin_id: str, destination_id: str, arrival_time: str) -> dict:
        trip_call = 'trip'

        trip_params = {
            'outputFormat': 'rapidJSON',
            'coordOutputFormat': 'EPSG:4326',
            'depArrMacro': 'arr', # dep or arr
            'itdDate': date.today().strftime("%Y%m%d"),  # Reference date in YYYYMMDD format
            'itdTime': arrival_time,       # Reference time in HHMM 24-hour format
            'type_origin': 'any',
            'name_origin': origin_id,
            'type_destination': 'any',
            'name_destination': destination_id,
            'calcNumberOfTrips': 1,
            'TfNSWTR': 'true',
            'itOptionsActive': 0,
        }

        response = requests.get(self.endpoint+trip_call, 
                                headers=self.header, 
                                params=trip_params)
        
        if response.status_code == 200:
            data = response.json()
            journey = data['journeys'][0]['legs'][0]
            trip_info = {
                'origin': journey['origin'],
                'destination': journey['destination'],
                'transportation': journey['transportation'],
                'stopSequence': journey['stopSequence'],
            }
            return trip_info
        else:
            print(f"Error: {response.status_code, json.dumps(response.json(), indent=4)}")