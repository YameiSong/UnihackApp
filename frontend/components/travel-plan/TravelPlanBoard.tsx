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

import TravelPlanItem from "./TravelPlanItem";
import { format } from "date-fns";

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
  const { travelPlans, setTravelPlans } = useGlobalContext();

  return (
    <Card className="min-h-[170px] shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Travel Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 max-h-[100px] overflow-y-auto">
          {travelPlans.map((item, index) => (
            <TravelPlanItem
              key={index}
              user_id={item.user_id}
              date={format(new Date(item.date), "do MMM yyyy")}
              expected_arrival_time={format(
                new Date(item.expected_arrival_time),
                "HH:mm"
              )}
              departure_address={item.departure_address}
              arrival_address={item.arrival_address}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelPlanBoard;
