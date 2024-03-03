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

interface Notification {
  departure_address: string,
  arrival_address: string,
  leave_before: string,
  name : string | null
}

const NotificationComponent = () => {
  const [notification, setNotifications] = useState<Notification | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  
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
    // Requests permission for browser notification.
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    // Manages permissions for browser notification (which is required)
    if ('Notification' in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission])

  useEffect(() => {
    // Sends a notification - the type of notification depends on the visibility state of the document
    if (notification== null) { return; }
   

    if (document.hasFocus() && notificationRef.current) {
      // in tab notification
      notificationRef.current.click()
    } else {
      sendBrowserNotification()
      notificationIsNotLoaded.current = true;
    }

  }, [notification]);

  const acceptRideShare = () => {
    if (detailsRef.current) { detailsRef.current.click() }

  }

  const rejectRideShare = () => {
    
  }

  const confirmRideShare = () => {
    const ret = {
      user_id: 1, // should be updated for the current user
      departure_address: notification.departure_address,
      arrival_address: notification.arrival_address,
      leave_before: notification.leave_before,
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
    
    <div>
  {/* Note that this button is for TESTING PURPOSES ONLY. TODO: Remove this button after testing */}
  <button className="p-4 bg-red-400 rounded-full text-white" onClick={handleAddNotification}>
    (TESTING) - Manually trigger a new notification
  </button>
  {/* PLEASE REMOVE ABOVE AFTER TESTING */}
  
  {notification && (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div ref={notificationRef}></div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <p className="text-center">{notification&& notification.name} wants to ride share from {notification.departure_address} to {notification.arrival_address}, leaving before {notification.leave_before}</p>
            </DrawerTitle>
            <DrawerDescription>
              <p className="text-center">This action cannot be undone.</p>
            </DrawerDescription>
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
            <DrawerTitle>
              <div className="grid md:grid-cols-2 ">
                <p className="text-center px-3 py-2 ">Please enter your contact information</p>
                <Input type="text" ref={contactRef} placeholder="Please provide your preferred method of communication" />
              </div>
            </DrawerTitle>
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
  )}
</div>

  )
};
export default NotificationComponent;