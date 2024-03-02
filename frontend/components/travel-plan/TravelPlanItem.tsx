import React from "react";

import { MoveRight, X } from "lucide-react";

interface TravelPlanItemProps {
  departureAddress: string;
  arrivalAddress: string;
  date: string;
  expectedArrivalTime: string;
}

const TravelPlanItem = ({
  departureAddress,
  arrivalAddress,
  date,
  expectedArrivalTime,
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
      <span className="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[50px]">
        {departureAddress}
      </span>
      <MoveRight size={20} />
      <span className="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[50px]">
        {arrivalAddress}
      </span>
      <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {`(${date}, arrive before ${expectedArrivalTime})`}
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
