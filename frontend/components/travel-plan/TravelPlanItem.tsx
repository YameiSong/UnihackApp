import React from "react";

import { MoveRight, X } from "lucide-react";

interface TravelPlanItemProps {
  user_id: number;
  date: string;
  expected_arrival_time: string;
  departure_address: string;
  arrival_address: string;
}

const TravelPlanItem = ({
  user_id,
  date,
  expected_arrival_time,
  departure_address,
  arrival_address,
}: TravelPlanItemProps) => {
  const handleDeleteTravelPlan = async () => {
    try {
      //call api to delete travel plan and update global state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group flex items-center text-sm space-x-2 p-1 px-2 w-full hover:bg-gray-100">
      <span className="flex mb-2 h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <span className="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[100px]">
        {departure_address}
      </span>
      <MoveRight size={20} />
      <span className="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[100px]">
        {arrival_address}
      </span>
      <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {`(${date}, arrive before ${expected_arrival_time})`}
      </span>
      <button
        onClick={handleDeleteTravelPlan}
        className="hidden group-hover:block"
      >
        <X className="text-rose-500" size={16} />
      </button>
    </div>
  );
};

export default TravelPlanItem;
