import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MonitorItem from "./MonitorItem";

const monitorItemsData = [
  {
    departureAddress: "Home",
    arrivalAddress: "School",
    date: "27th Feb",
    arrivalTime: "10:00",
  },
  {
    departureAddress: "Home",
    arrivalAddress: "Work",
    date: "27th Feb",
    arrivalTime: "12:00",
  },
  {
    departureAddress: "Home",
    arrivalAddress: "Gym",
    date: "28th Feb",
    arrivalTime: "15:00",
  },
];

const MonitorBoard = () => {
  return (
    <Card className="min-h-[170px] shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Weekly Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 max-h-[100px] overflow-y-auto">
          {monitorItemsData.map((item, index) => (
            <MonitorItem key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitorBoard;
