import React from "react";

import { MoveRight } from "lucide-react";

interface MoonitorItemProps {
  departureAddress: string;
  arrivalAddress: string;
  date: string;
  expectedArrivalTime: string;
}

const MonitorItem = ({
  departureAddress,
  arrivalAddress,
  date,
  expectedArrivalTime,
}: MoonitorItemProps) => {
  return (
    <div className="flex items-center text-sm space-x-2">
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
    </div>
  );
};

export default MonitorItem;
