// Libs
import { useEffect, useRef } from "react";

export const delayRefresh = process.env.REACT_APP_REFRESH_TIME || 10 * 1000;

/**
 * Interval made descriptive.
 * @param {func} callback Callback
 * @param {bool|number} delay Delay for interval or true for default delay or false for no delay
 */
export function useInterval(callback, delay = false) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null && delay !== false) {
            const id = setInterval(tick, Number.isInteger(delay) ? delay : delayRefresh);
            return () => clearInterval(id);
        }
    }, [delay]);
}
