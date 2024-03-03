"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SharedRiding from "./ShareRiding";
import Route from "./Route";
import ITravelMonitor from "@/types/ITravelMonitor";
import axiosInstance from "@/lib/axiosConfig";

const suggestedRoutes = [
  {
    departureTime: "8:00 AM",
    departureAddress: "Townhall",
    arrivalTime: "8:30 AM",
    arrivalAddress: "QVB",
  },
  {
    departureTime: "8:00 AM",
    departureAddress: "Townhall",
    arrivalTime: "8:30 AM",
    arrivalAddress: "QVB",
  },
  {
    departureTime: "8:00 AM",
    departureAddress: "Townhall",
    arrivalTime: "8:30 AM",
    arrivalAddress: "QVB",
  },
];

const TrackRouteBoard = () => {
  const [travelMonitor, setTravelMonitor] = useState<ITravelMonitor>();

  useEffect(() => {
    try {
      //call api to fetch today's monitor
      const fetchTodayMonitor = async () => {
        const res = await axiosInstance.get("/trip?userID=1");
        console.log(res.data);
      };
      fetchTodayMonitor();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const svgCount = [1, 2, 3];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Tracking Route</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-7">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-7 md:space-y-0 md:space-x-3">
            <Card className="rounded-md shadow-md bg-gray-100 md:w-[30%] border-0 w-full h-[140px]">
              <CardContent className="flex flex-col items-start space-y-1 p-5">
                <span className="text-xs font-[500]">Crowd Density</span>
                <span className="text-xl font-bold text-black">Moderate</span>
                <div className="flex pt-2">
                  {svgCount.map((_, index) => (
                    <span key={index} className="icon-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width="30"
                        height="30"
                        fill="none"
                      >
                        <path
                          d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md shadow-md bg-gray-100 md:w-[30%] border-0 w-full h-[140px]">
              <CardContent className="flex flex-col items-start space-y-2 p-5">
                <span className="text-xs font-[500]">Arrival Status</span>
                <span className="text-xl font-bold text-black">Delayed</span>
                <span className="text-xl pt-2">15 mins</span>
              </CardContent>
            </Card>

            <Card className="rounded-md shadow-md bg-gray-100 md:w-[30%] border-0 w-full h-[140px]">
              <CardContent className="flex flex-col items-start space-y-1 p-5">
                <span className="text-xs font-[500]">From</span>
                <span className="text-xl font-semibold text-black">
                  Townhall
                </span>
                <span className="text-xs font-[500]">To</span>
                <span className="text-xl font-semibold text-black">QVB</span>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-md shadow-md bg-gray-100 min-h-[180px] border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold mb-1">
                Suggested Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {!travelMonitor && (
                  // handle case when no travel plans for today here, display no suggested route available
                  <div></div>
                  // <div className="flex items-center justify-center h-[100px]">
                  //   No suggested route available
                  // </div>
                )}
                {suggestedRoutes.map((route, index) => (
                  <Route
                    key={index}
                    departureTime={route.departureTime}
                    departureAddress={route.departureAddress}
                    arrivalTime={route.arrivalTime}
                    arrivalAddress={route.arrivalAddress}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <SharedRiding />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackRouteBoard;
