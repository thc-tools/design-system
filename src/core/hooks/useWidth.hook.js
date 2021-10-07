// Libs
import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";

/**
 * Hook to help resize elements with available width
 * @param {number} defaultWidth Default width (pre-mount)
 * @returns {width, ref}
 */
export function useWidth(defaultWidth) {
    const ref = useRef();
    const [width, setWidth] = useState(defaultWidth);

    const div = useCallback(
        (node) => {
            ref.current = node;

            if (ref.current !== null && node) {
                setWidth(Math.floor(node.getBoundingClientRect().width) - 5);
            }
        },
        [setWidth]
    );

    useEffect(() => {
        function updateWidth() {
            if (ref.current !== null) {
                setWidth(Math.floor(ref.current?.getBoundingClientRect().width) - 5);
            }
        }

        const debouncedUpdateWith = debounce(updateWidth);

        window.addEventListener("resize", debouncedUpdateWith);

        return () => {
            window.removeEventListener("resize", debouncedUpdateWith);
        };
    }, [setWidth, ref]);

    return { width, div };
}
