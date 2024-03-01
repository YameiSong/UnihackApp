import React from "react";

import { MoveRight } from "lucide-react";

interface MoonitorItemProps {
  departureAddress: string;
  arrivalAddress: string;
  date: string;
  arrivalTime: string;
}

const MonitorItem = ({
  departureAddress,
  arrivalAddress,
  date,
  arrivalTime,
}: MoonitorItemProps) => {
  return (
    <div className="flex items-center text-sm space-x-2">
      <span className="flex mb-2 h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <span>{departureAddress}</span>
      <MoveRight size={20} />
      <span>{arrivalAddress}</span>
      <span>{`(${date}, arrive before ${arrivalTime})`}</span>
    </div>
  );
};

export default MonitorItem;
