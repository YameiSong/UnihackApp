import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TagBoard = () => {
  return (
    <Card className="min-h-[120px] shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-bold">Tag</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default TagBoard;
