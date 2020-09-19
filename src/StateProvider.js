import React, { createContext, useContext, useReducer } from "react";

//preapers the dataLayer
export const StateContext = createContext();

//wrap our app & provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Pull information form the data layer
export const useStateValue = () => useContext(StateContext);
