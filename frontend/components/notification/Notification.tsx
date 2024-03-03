"use client";
import { useEffect, useCallback, useState, useRef } from "react";
import GlobalProvider from "../providers/GlobalStateProvider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input";
import axiosInstance from "@/lib/axiosConfig";
import axios from "axios";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<string>({} as any);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  const dummyData = { destination: "Redfern", departure: "Central", departBefore: "10:00", passenger: "John Doe", rejected: false };
  let notificationIsNotLoaded = useRef(false);



  useEffect(() => {
    try {
      const fetchNotification = async () => {
        const response = await axiosInstance.get("trip?user_id=1");
        try{
          // Get user's name
          const response = await axiosInstance.get("login?user_id=1")
          console.log(response.data)
        }catch(error){
          console.log(error);
        }
        setNotifications(response.data.rideSharing)
       
      };
      fetchNotification()
    } catch (error) {
      console.log(error);
    }
  }, []);


   

  useEffect(() => {
    // Handles the case where the user was on a different tab, received a notification,
    // and then returns to the tab
    const handleWindowFocus = () => {
      if (notificationIsNotLoaded.current && notificationRef.current) {
        (notificationRef.current as HTMLElement).click()
        notificationIsNotLoaded.current = false;
        console.log("runs");
      }
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  const handleAddNotification = (notification) => {
    // This is to mimic receiving a notification from the backend
    setNotifications(notification)
    console.log(notification)
  }

  const requestNotificationPermission = useCallback(() => {
    // Requests permission for browser notifications.
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    // Manages permissions for browser notifications (which is required)
    if ('Notification' in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission])

  useEffect(() => {
    // Sends a notification - the type of notification depends on the visibility state of the document
    if (Object.keys(notifications).length === 0) { return; }
   

    if (document.hasFocus() && notificationRef.current) {
      // in tab notification
      notificationRef.current.click()
    } else {
      sendBrowserNotification()
      notificationIsNotLoaded.current = true;
    }

  }, [notifications]);

  const acceptRideShare = () => {
    if (detailsRef.current) { detailsRef.current.click() }

  }

  const rejectRideShare = () => {
    
  }

  const confirmRideShare = () => {
    const ret = {
      user_id: 1, // should be updated for the current user
      departure_address: notifications.departure_address,
      arrival_address: notifications.arrival_address,
      leave_before: notifications.leave_before,
      contact: contactRef.current.value
    };
    
    try {
      const sendNotification = async () => {
        const response = await axiosInstance.put("/ridesharing/", ret);
        console.log(response.data);
      };
      
     sendNotification();
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  const sendBrowserNotification = () => {
    // Sends notification to the browser
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Notification', {
        body: 'This is a new notification'
      });

    } else {
      requestNotificationPermission()
    }
  }

  return (
    <>
      {
        // Note that this button is for TESTING PURPOSES ONLY TODO: remove this button
      }
      <button className="p-4 bg-red-400 rounded-full text-white" onClick={handleAddNotification}>
        (TESTING) - manually trigger a new notification
      </button>
      {
        // PLEASE REMOVE ABOVE AFTER TESTING
      }
      <Drawer>
        <DrawerTrigger asChild>
          <div ref={notificationRef}></div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle><p className="text-center">(HARDCODED NAME) wants to ride share from {notifications.departure_address} to {notifications.arrival_address}, leaving before {notifications.leave_before}</p></DrawerTitle>
            <DrawerDescription><p className="text-center">This action cannot be undone.</p></DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>

            <DrawerClose>
              <div className="grid grid-cols-2 gap-x-12">
                <Button onClick={rejectRideShare} variant="outline">Reject</Button>
                <Button onClick={acceptRideShare}>Join</Button>
              </div>

            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <div ref={detailsRef}></div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle><div className="grid md:grid-cols-2 "><p className="text-center px-3 py-2 ">Please enter your contact information</p><Input type="text" ref={contactRef} placeholder="Please provide your preferred method of communication"></Input></div></DrawerTitle>

          </DrawerHeader>


          <DrawerFooter>
            <DrawerClose>
              <div className="grid sm:grid-cols-2 sm:grid-rows-1 gap-x-12">
                <Button className="sm:col-start-2 sm:row-start-1" onClick={confirmRideShare}>Submit</Button>
                <Button className="sm:col-start-1 sm:row-start-" onClick={rejectRideShare} variant="outline">Reject</Button>

              </div>

            </DrawerClose>

          </DrawerFooter>

        </DrawerContent>
      </Drawer>


    </>
  )
};
export default NotificationComponent;