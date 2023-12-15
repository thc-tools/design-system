// Libs
import { useEffect, useRef } from "react";

/**
 * Helper to know if component is already mounted
 * @returns {bool}
 */
export function useIsMounted(): boolean {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    return isMounted.current;
}
