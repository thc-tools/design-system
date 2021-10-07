// Libs
import React, { useContext } from "react";

export const StepContext = React.createContext({});

export function useStep() {
    return useContext(StepContext);
}
