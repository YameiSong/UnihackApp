"use client";
import React, {useContext, useState } from 'react';

const GlobalContext = React.createContext(null);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}

const GlobalProvider = ({ children }) => {
  const [tagTimes, setTagTimes] = useState([]);
  const [tags, setTags] = useState([{value: "home", address: "1234 home street"}]);
  const tagColours = [
    '#B7DDF9',
    '#ECCBF4',
    '#CBF4EA',
    '#E2FA7F',
  ];

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
    <GlobalContext.Provider value={{tagTimes, setTagTimes, tags, setTags, tagColours}}>
      {children}
    </GlobalContext.Provider>
  )
};
export default GlobalProvider;
