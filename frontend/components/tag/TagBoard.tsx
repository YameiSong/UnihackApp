"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Tag from "./Tag";
import { useGlobalContext } from "../providers/GlobalStateProvider";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TagBoard = () => {
  const { tags, setTags, tagColours } = useGlobalContext();
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const newTagValueRef = useRef<HTMLInputElement>(null);
  const newTagAddressRef = useRef<HTMLInputElement>(null);

  const handleCreateTag = async () => {
    const value = newTagValueRef.current?.value;
    const address = newTagAddressRef.current?.value;

    if (!value || !address) {
      return;
    }

    setTags([
      ...tags,
      { id: tags.length + 1, user_id: 1, tag_name: value, address: address },
    ]);
    dialogTriggerRef.current?.click();
  };

  const handleAddTag = () => {
    dialogTriggerRef.current?.click();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="hidden" ref={dialogTriggerRef}>
          Close
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Create a tag</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tag name:
              </Label>
              <Input id="name" className="col-span-3" ref={newTagValueRef} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Address:
              </Label>
              <Input
                id="username"
                className="col-span-3"
                ref={newTagAddressRef}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateTag}>Create tag</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="min-h-[120px] shadow-md">
        <CardHeader className="flex flex-row items-center space-y-0 gap-x-4">
          <CardTitle className="text-lg font-bold">Tag</CardTitle>
          <button
            className="ring-2 ring-black rounded-full h-4 w-4 flex items-center justify-center"
            onClick={handleAddTag}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" />
              <path
                d="M12 6V18"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 12H18"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col border border-rounded rounded-lg p-4 gap-y-4 w-full min-h-[80px] grow shrink justify-center">
            <div className="flex flex-row h-full flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <Tag
                    key={index}
                    {...tag}
                    backgroundColour={tagColours[index % tagColours.length]}
                  />
                ))
              ) : (
                <p className="text-sm font-bold">Create a tag to get started</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TagBoard;
