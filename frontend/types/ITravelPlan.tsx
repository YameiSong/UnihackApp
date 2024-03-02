interface ITravelPlan {
  user_id: number;
  date: string;
  event_name: string;
  expected_arrival_time: string;
  time_to_departure_platform: string;
  departure_address: string;
  departure_stop_id: string;
  arrival_address: string;
  arrival_stop_id: string;
  transport_mode: string;
}

export default ITravelPlan;
