// Libs
import { useCallback, useState } from "react";

/**
 * Helper to handle hover state in JS.
 * @param {bool} disabled If is disabled
 * @param {func} onHover Hover handler
 * @returns { hover, onMouseEnter, onMouseLeave }
 */
export function useHover(
    disabled = false,
    onHover?: (hover: boolean) => void
): { hover: boolean; onMouseEnter: (event: any) => void; onMouseLeave: (event: any) => void } {
    const [hover, setHover] = useState(false);

    const mouseEnterHandler = useCallback(
        (event) => {
            if (disabled) {
                event.stopPropagation();
                return;
            }

            if (onHover) {
                onHover(true);
            }

            setHover(true);
        },
        [disabled, onHover, setHover]
    );

    const mouseLeaveHandler = useCallback(
        (event) => {
            if (disabled) {
                event.stopPropagation();
                return;
            }

            if (onHover) {
                onHover(false);
            }

            setHover(false);
        },
        [disabled, onHover, setHover]
    );

    return { hover, onMouseEnter: mouseEnterHandler, onMouseLeave: mouseLeaveHandler };
}
