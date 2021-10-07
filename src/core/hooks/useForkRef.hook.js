// Libs
import { useMemo } from "react";

function setRef(ref, value) {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}

/**
 * When you need to have a ref in to place, fork it
 * @param {React.MutableRefObject} refA
 * @param {React.MutableRefObject} refB
 */
export function useForkRef(refA, refB) {
    return useMemo(() => {
        if (refA === null && refB == null) {
            return null;
        }

        return (refValue) => {
            setRef(refA, refValue);
            setRef(refB, refValue);
        };
    }, [refA, refB]);
}
