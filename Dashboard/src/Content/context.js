import { createContext, useContext } from "react";

export const counterContext = createContext(false);
export const uidContext = createContext();
export const data = createContext(0);
export const counterUpdate = createContext(false);