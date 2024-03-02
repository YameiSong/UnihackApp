"use client";
import React, { useContext, useState } from "react";
import TravelPlan from "@/types/TravelPlan";

interface GlobalContextProps {
  tagTimes: [];
  setTagTimes: (tagTimes: []) => void;
  tags: {
    value: string;
    address: string;
  }[];
  setTags: (tags: { value: string; address: string }[]) => void;
  tagColours: string[];

  //travel plans
  travelPlans: TravelPlan[];
  setTravelPlans: (travelPlans: TravelPlan[]) => void;
}

const GlobalContext = React.createContext<GlobalContextProps>({
  tagTimes: [],
  setTagTimes: () => {},
  tags: [{ value: "home", address: "1234 home street" }],
  setTags: () => {},
  tagColours: ["#B7DDF9", "#ECCBF4", "#CBF4EA", "#E2FA7F"],

  travelPlans: [],
  setTravelPlans: () => {},
});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }: any) => {
  const [tagTimes, setTagTimes] = useState<[]>([]);
  const [tags, setTags] = useState<
    {
      value: string;
      address: string;
    }[]
  >([
    { value: "home", address: "1234 home street" },
    { value: "school", address: "1234 school street" },
  ]);
  const tagColours = ["#B7DDF9", "#ECCBF4", "#CBF4EA", "#E2FA7F"];

  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);

  /**
   * A TagTime is described as follows:
   * TagTime = {
   *  {
   *      value: string,
   *      address: string
   *  },
   *  arriveBy: Date()
   * }
   *
   * A tag is described as follows:
   * Tag = {
   *      value: string,
   *      address: string
   *  }
   *
   * Note that this is the object initially sent to the backend,
   * who will compute the rest based off api response
   *
   */

  return (
    <GlobalContext.Provider
      value={{
        tagTimes,
        setTagTimes,
        tags,
        setTags,
        tagColours,
        travelPlans,
        setTravelPlans,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
