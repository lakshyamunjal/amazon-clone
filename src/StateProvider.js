import React, { createContext, useContext, useReducer } from "react";

// Prepares the dataLayer
// It will create a Context object.
export const StateContext = createContext();

// Wrap our app and provide the Data layer
// Provider component  will be used in all the components warpped inside it.
// value is passed to all the child components
export const StateProvider = ({ reducer, initialState, children }) => (
  // reducer is the function which is defined in reducer.js and is used to do changes to the state
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
// StateProvider is attached to StateContext and whenever we want to access values of provider, we will make use of StateContext.
export const useStateValue = () => useContext(StateContext);