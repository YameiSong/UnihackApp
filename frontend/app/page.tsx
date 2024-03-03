import { Metadata } from "next";

import MainNav from "@/components/navigation/MainNav";
import UserNav from "@/components/navigation/UserNav";
import CalendarBoard from "@/components/calendar/CalendarBoard";
import MonitorBoard from "@/components/travel-plan/TravelPlanBoard";
import TagBoard from "@/components/tag/TagBoard";
import TrackRouteBoard from "@/components/track-route/TrackRouteBoard";
import GlobalProvider from "@/components/providers/GlobalStateProvider";
import NotificationComponent from "@/components/notification/Notification";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <GlobalProvider>
      <div className="flex flex-col">
        <div className="border-b bg-teal-500">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>

          <div className="grid lg:gap-10 grid-cols-1 lg:grid-cols-7 space-y-4">
            <div className="col-span-3 space-y-4">
              <TagBoard />
              <CalendarBoard />
              <MonitorBoard />
            </div>

            <div className="col-span-4">
              <TrackRouteBoard />
            </div>
          </div>
        </div>
      </div>
     <NotificationComponent/>
    </GlobalProvider>
  );
}
