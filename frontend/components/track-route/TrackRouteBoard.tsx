import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TrackRouteBoard = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Tracking Route</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-7">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-7 md:space-y-0 md:space-x-3">
            <Card className="rounded-md shadow-md bg-gray-100 md:w-[30%] border-0 w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">Moderate</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            <Card className="rounded-md shadow-md bg-gray-100 md:w-[30%] border-0 w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">Delayed</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            <Card className="rounded-md shadow-md bg-gray-100 md:w-[30%] border-0 w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-bold">From - To</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>

          <Card className="rounded-md shadow-md bg-gray-100 min-h-[300px] border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Suggested Route
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackRouteBoard;
