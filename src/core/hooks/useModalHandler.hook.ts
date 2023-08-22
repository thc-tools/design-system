// Libs
import { useEffect, useRef } from "react";

// Utils
import { removeUndefinedKeys } from "../utils";

// Hooks
import { useQueryString } from "./useQueryString.hook";

/**
 * Hook to help handle modal lifecycle (see useQueryString for qsKey a initialValue usage)
 * @param {string|string[]} qsKey Keys to handle in query
 * @param {func} closeCallback Callback to call when the modal is closed
 * @param {string|object} initialValue Initial values for query parameters
 * @returns {[value, onSetValue]}
 */
export function useModalHandler(qsKey, closeCallback, initialValue) {
    const [value, onSetValue] = useQueryString(qsKey, initialValue);

    const closeCallbackRef = useRef();
    useEffect(() => {
        closeCallbackRef.current = closeCallback;
    }, [closeCallback]);

    // Detect closure of modal
    const prevValueRef = useRef(value);
    useEffect(() => {
        if (!closeCallbackRef.current) {
            return;
        }

        const simpleMode = typeof qsKey === "string";

        if (simpleMode && prevValueRef.current && !value) {
            closeCallbackRef.current();
        } else if (!simpleMode) {
            const u1 = removeUndefinedKeys(prevValueRef.current ?? {});
            const u2 = removeUndefinedKeys(value ?? {});

            if (Object.keys(u1).length > 0 && Object.keys(u2).length === 0) {
                closeCallbackRef.current();
            }
        }

        prevValueRef.current = value;
    }, [value, qsKey, prevValueRef, closeCallbackRef]);

    return [value, onSetValue];
}
