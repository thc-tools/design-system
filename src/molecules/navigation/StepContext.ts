// Libs
import React, { useContext } from "react";

export const StepContext = React.createContext<{ activeStep: number }>({ activeStep: 0 });

export function useStep() {
    return useContext(StepContext);
}
