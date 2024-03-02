import TravelPlan from "./TravelPlan";

interface TravelMonitor {
  travelPlan: TravelPlan;
  updatedAt: string;
  estimatedTravelTime: string;
}

export default TravelMonitor;
