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

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const notificationRef = useRef(null);
    const detailsRef = useRef(null);
    const dummyData = { destination: "Redfern", departure: "Central", departBefore: "10:00", passenger: "John Doe", rejected: false };
    let notificationIsNotLoaded = useRef(false);
    
    useEffect(() => {
        // Simulate an asynchronous operation with a delay of 5 seconds
        const asyncOperation = async () => {
            /// Replace with call to backend endpoint for notifications
            await new Promise(resolve => setTimeout(resolve, 5000));
            handleAddNotification({ payload: "new notification" });

        };

        asyncOperation();
    }, []);

    useEffect(() => {
        // Handles the case where the user was on a different tab, received a notification,
        // and then returns to the tab
        const handleWindowFocus = () => {
            if (notificationIsNotLoaded.current){
                notificationRef.current.click()
                notificationIsNotLoaded = false;
                console.log("runs");
            }      
        };
    
        window.addEventListener('focus', handleWindowFocus);
    
        return () => {
          window.removeEventListener('focus', handleWindowFocus);
        };
      }, []);

    const handleAddNotification = ({ payload }) => {
        // This is to mimic receiving a notification from the backend
        setNotifications([...notifications, "new notification"])
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
        if (notifications.length === 0) { return; }
        if (document.hasFocus()) {
            // in tab notification
            notificationRef.current.click()
        } else {
            sendBrowserNotification()
            notificationIsNotLoaded.current = true;
        }

    }, [notifications]);

    const acceptRideShare = () => {
        detailsRef.current.click();
    }

    const rejectRideShare = () => {
        dummyData.rejected = false;
    }

    const confirmRideShare = () => {
        dummyData.rejected = true;
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
                        <DrawerTitle><p className="text-center">{dummyData.passenger} wants to ride share from {dummyData.departure} to {dummyData.destination}, leaving before {dummyData.departBefore}</p></DrawerTitle>
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
                        <DrawerTitle><div className="grid md:grid-cols-2 "><p className="text-center px-3 py-2 ">Please enter your contact information</p><Input type="text" placeholder="Please provide your preferred method of communication"></Input></div></DrawerTitle>

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