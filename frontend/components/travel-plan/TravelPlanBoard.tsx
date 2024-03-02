"use client";

import React, { useEffect } from "react";
import { useGlobalContext } from "../providers/GlobalStateProvider";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MonitorItem from "./TravelPlanItem";

const travelPlanItemsData = [
  {
    stopId: 0,
    departureAddress: "Home",
    arrivalAddress: "School",
    date: "27th Feb",
    expectedArrivalTime: "10:00",
    transportMode: "Bus",
  },
  {
    stopId: 0,
    departureAddress: "Home",
    arrivalAddress: "School",
    date: "27th Feb",
    expectedArrivalTime: "10:00",
    transportMode: "Bus",
  },
  {
    stopId: 0,
    departureAddress: "Home",
    arrivalAddress: "School",
    date: "27th Feb",
    expectedArrivalTime: "10:00",
    transportMode: "Bus",
  },
];

const TravelPlanBoard = () => {
  // const [monitorItems, setMonitorItems] = React.useState(travelPlanItemsData);
  const { travelPlans, setTravelPlans } = useGlobalContext();

  useEffect(() => {
    //call api
    setTravelPlans(travelPlanItemsData);
  }, []);

  return (
    <Card className="min-h-[170px] shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Travel Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 max-h-[100px] overflow-y-auto">
          {travelPlans.map((item, index) => (
            <MonitorItem
              key={index}
              arrivalAddress={item.arrivalAddress}
              departureAddress={item.departureAddress}
              date={item.date}
              expectedArrivalTime={item.expectedArrivalTime}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelPlanBoard;
