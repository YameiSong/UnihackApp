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
} from "@/components/ui/dialog";

const TagBoard = () => {
  const {tags, setTags, tagColours} = useGlobalContext()
  const dialogTriggerRef = useRef(null);
  const newTagValueRef = useRef(null);
  const newTagAddressRef = useRef(null);

  const handleCreateTag = () => {
    const value = newTagValueRef.current.value;
    const address = newTagAddressRef.current.value;
    setTags([...tags, {value, address}]);
    dialogTriggerRef.current.click()
  }

  const handleAddTag = () => {
    dialogTriggerRef.current.click()
  }

  return (
    <>
    <Dialog>
        <DialogTrigger className='hidden' ref={dialogTriggerRef}>Close</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center'>Create a tag</DialogTitle>
            <DialogDescription>
              <div className="grid grid-rows-3 grid-cols-2 gap-y-4 mt-4">
                <div className="row-start-1 col-start-1 flex items-center">
                  Enter tag name:
                </div>
                <div className="row-start-1 col-start-2 flex items-center justify-center">
                  <input type="text" ref={newTagValueRef} className="border border-2 border-gray-400 rounded"></input>
                </div>
                <div className="row-start-2 col-start-1 flex items-center">
                  Enter address:
                </div>
                <div className="row-start-2 col-start-2 flex items-center justify-center">
                  <input type="text" ref={newTagAddressRef} className="border border-2 border-gray-400 rounded"></input>
                </div>
                <div className="row-start-3 col-span-2 flex justify-center">
                  <button className="border border-2 rounded-lg p-2 border-gray-400" onClick={handleCreateTag}>Create Tag</button>
                </div>

              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card className="min-h-[120px] shadow-md">
      <CardHeader className="flex flex-row items-center space-y-0 gap-x-4">
        <CardTitle className="text-lg font-bold">Tag</CardTitle>
        <button className="ring-2 ring-black rounded-full h-4 w-4 flex items-center justify-center" onClick={handleAddTag}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24"/>
        <path d="M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12H18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </svg>
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col border border-rounded rounded-lg p-4 gap-y-4 w-full min-h-[80px] grow shrink justify-center">
            
              <div className="flex flex-row h-full flex-wrap gap-2">

                  {tags.length > 0 ? (
                      tags.map((tag, index) => (
                        <>
                        <Tag key={index} {...tag} backgroundColour={tagColours[index % tagColours.length]}>

                      </Tag>
                   
                        </>
                          
                      ))
                  ): <p className="text-sm font-bold">Create a tag to get started</p>
                }

              </div>
          </div>

      </CardContent>
    </Card>
    </>
   
  );
};

export default TagBoard;
