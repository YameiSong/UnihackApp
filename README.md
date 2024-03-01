# README

## How to use transport api

1. Run `pip install python-dotenv`
2. Create an `.env` file in top level project directory.
3. Write api key in `.env` file:
   ```
   API_KEY="write your api key here"
   ```

```python
from transport_api import TransportAPI

api = TransportAPI()
origin_stop_id = api.query_stop('Redfern') # string
destination_stop_id = api.query_stop('Randwick') # string
arrival_time = '2200' # HHMM format string
trip = api.query_trip(origin_stop_id, destination_stop_id, arrival_time) # dict
```