import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CalendarBoard = () => {
  return (
    <Card className="min-h-[180px] shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Calendar</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default CalendarBoard;
