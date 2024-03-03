import { MoveRight } from "lucide-react";
import React from "react";

interface RouteProps {
  departureTime: string;
  departureAddress: string;
  arrivalTime: string;
  arrivalAddress: string;
}

const Route = ({
  departureTime,
  departureAddress,
  arrivalTime,
  arrivalAddress,
}: RouteProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center rounded-full w-[18px] h-[18px] bg-yellow-400 text-xs text-white">
        T
      </div>
      <span>{departureTime}</span>
      <span className="font-semibold">{departureAddress}</span>
      <MoveRight size={20} />
      <div className="flex items-center justify-center rounded-full w-[18px] h-[18px] bg-yellow-400 text-xs text-white">
        T
      </div>
      <span>{arrivalTime}</span>
      <span className="font-semibold">{arrivalAddress}</span>
    </div>
  );
};

export default Route;
