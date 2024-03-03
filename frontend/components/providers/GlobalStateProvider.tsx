"use client";
import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosConfig";

import ITravelPlan from "@/types/ITravelPlan";
import ITag from "@/types/ITag";

interface GlobalContextProps {
  tagTimes: [];
  setTagTimes: (tagTimes: []) => void;
  tags: ITag[];
  setTags: (tags: ITag[]) => void;
  tagColours: string[];

  //travel plans
  travelPlans: ITravelPlan[];
  setTravelPlans: (travelPlans: ITravelPlan[]) => void;
}

const GlobalContext = React.createContext<GlobalContextProps>({
  tagTimes: [],
  setTagTimes: () => {},
  tags: [],
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
  const [tags, setTags] = useState<ITag[]>([]);
  const tagColours = ["#B7DDF9", "#ECCBF4", "#CBF4EA", "#E2FA7F"];

  const [travelPlans, setTravelPlans] = useState<ITravelPlan[]>([]);

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

  useEffect(() => {
    try {
      const fetchAllTags = async () => {
        const res = await axiosInstance.get("/tag?user_id=1");
        console.log(res.data);
        setTags(res.data);
      };
      fetchAllTags();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchAllTravelPlans = async () => {
        const res = await axiosInstance.get("/travelplan?user_id=1");
        console.log(res.data);
        setTravelPlans(res.data);
      };
      fetchAllTravelPlans();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
