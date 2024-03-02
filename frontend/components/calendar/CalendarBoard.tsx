"use client";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRef, useState } from "react";
import { useGlobalContext } from "../providers/GlobalStateProvider";
import Tag from "../tag/Tag";

import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const CalendarBoard = () => {
  const {
    tags,
    tagTimes,
    setTagTimes,
    tagColours,
    travelPlans,
    setTravelPlans,
  } = useGlobalContext();

  const [openDepartureTagChoices, setOpenDepartureTagChoices] = useState(false);
  const [departureTagChoice, setDepartureTagChoice] = useState<{
    value: string;
    address: string;
  }>();

  const [openDestinationTagChoices, setOpenDestinationTagChoices] =
    useState(false);
  const [destinationTagChoice, setDestinationTagChoice] = useState<{
    value: string;
    address: string;
  }>();

  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const addTagTimeTimeRef = useRef<HTMLInputElement>(null);

  let selectedDate = new Date();

  const addTagTime = async () => {
    dialogTriggerRef.current?.click();

    const [hoursString, minutesString] =
      addTagTimeTimeRef.current?.value.split(":") || [];

    selectedDate.setHours(parseInt(hoursString));
    selectedDate.setMinutes(parseInt(minutesString));

    const tagTime = {
      departureTag: departureTagChoice,
      destinationTag: destinationTagChoice,
      time: selectedDate,
    };
    console.log(tagTime);

    if (tagTime.departureTag?.address === tagTime.destinationTag?.address) {
      alert("Departure and destination cannot be the same");
      return;
    }

    //call api
    try {
      const travelPlan = {
        stopId: 0,
        date: format(selectedDate, "dd MMM yyyy"),
        expectedArrivalTime: format(selectedDate, "HH:mm"),
        departureAddress: tagTime.departureTag?.address || "",
        arrivalAddress: tagTime.destinationTag?.address || "",
        transportMode: "Bus",
      };

      setTravelPlans([...travelPlans, travelPlan]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDay = (value: Date) => {
    dialogTriggerRef.current?.click();
    selectedDate = value;
  };
  return (
    <>
      <Dialog>
        <DialogTrigger className="hidden" ref={dialogTriggerRef}>
          Close
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Create Travel Plan
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Departure
              </Label>

              <Popover
                open={openDepartureTagChoices}
                onOpenChange={setOpenDepartureTagChoices}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openDepartureTagChoices}
                    className="col-span-2 justify-between drop-shadow-lg p-2 flex items-center"
                  >
                    {departureTagChoice ? (
                      <Tag
                        value={departureTagChoice.value}
                        backgroundColour={
                          tagColours[
                            tags.indexOf(departureTagChoice) % tagColours.length
                          ]
                        }
                        canDelete={false}
                      />
                    ) : (
                      "Select tag"
                    )}
                    {!openDepartureTagChoices ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search Tag..." />
                    <CommandEmpty>No tags created.</CommandEmpty>
                    <CommandGroup>
                      {tags.map((tag, index) => (
                        <CommandItem
                          key={tag.value}
                          value={tag.value}
                          onSelect={() => {
                            setDepartureTagChoice(tag);
                            setOpenDepartureTagChoices(false);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Tag
                              value={tag.value}
                              key={index}
                              backgroundColour={
                                tagColours[index % tagColours.length]
                              }
                              canDelete={false}
                            />
                            <span className="font-semibold">{tag.address}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Destination
              </Label>

              <Popover
                open={openDestinationTagChoices}
                onOpenChange={setOpenDestinationTagChoices}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openDestinationTagChoices}
                    className="col-span-2 justify-between drop-shadow-lg p-2 flex items-center"
                  >
                    {destinationTagChoice ? (
                      <Tag
                        value={destinationTagChoice.value}
                        backgroundColour={
                          tagColours[
                            tags.indexOf(destinationTagChoice) %
                              tagColours.length
                          ]
                        }
                        canDelete={false}
                      />
                    ) : (
                      "Select tag"
                    )}
                    {!openDestinationTagChoices ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search Tag..." />
                    <CommandEmpty>No tags created.</CommandEmpty>
                    <CommandGroup>
                      {tags.map((tag, index) => (
                        <CommandItem
                          key={tag.value}
                          value={tag.value}
                          onSelect={() => {
                            setDestinationTagChoice(tag);
                            setOpenDestinationTagChoices(false);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Tag
                              value={tag.value}
                              key={index}
                              backgroundColour={
                                tagColours[index % tagColours.length]
                              }
                              canDelete={false}
                            />
                            <span className="font-semibold">{tag.address}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Arrive Before
              </Label>

              <input
                ref={addTagTimeTimeRef}
                type="time"
                className=" drop-shadow-lg p-2 col-span-2"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              className="ring-2 rounded-lg p-2 ring-gray-400"
              onClick={addTagTime}
            >
              Add tag and time
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="min-h-[180px] shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">Calendar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar onClickDay={handleClickDay} locale="en-US" />
        </CardContent>
      </Card>
    </>
  );
};

export default CalendarBoard;
