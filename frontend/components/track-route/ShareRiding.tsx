"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ShareRiding = () => {
  const [inputField, setInputField] = useState({
    contact: "",
    leaveBefore: "",
    from: "",
    to: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({
      ...inputField,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(inputField);
  };

  return (
    <Card className="rounded-md shadow-md bg-gray-100 border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Share Riding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Contact
          </Label>
          <Input
            type="text"
            id="contact"
            placeholder="Enter contact"
            className="col-span-2"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Leave before
          </Label>
          <Input
            type="text"
            id="leaveBefore"
            placeholder="Enter time"
            className="col-span-2"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            From
          </Label>
          <Input
            type="text"
            id="from"
            placeholder="Enter departure location"
            className="col-span-2"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            To
          </Label>
          <Input
            type="text"
            id="to"
            placeholder="Enter destination location"
            className="col-span-2"
            onChange={handleChange}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShareRiding;
