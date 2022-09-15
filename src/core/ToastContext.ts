import React, { useContext } from "react";

/**
 * Toast context
 */
export const ToastContext = React.createContext({});

/**
 * Hook to access toast context
 */
export function useToast() {
    return useContext(ToastContext);
}
