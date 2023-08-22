// Libs
import { useCallback } from "react";

// Hooks
import { useFocus } from "./useFocus.hook";

/**
 * Helper to handle Focus & Blur state in JS.
 * @param {bool} disabled If is disabled
 * @param {func} onFocus Focus handler
 * @param {func} onBlur Blur handler
 * @returns { focus, setFocus, _handleFocus, _handleBlur }
 */
export function useFocusAndBlur(disabled = false, onFocus, onBlur) {
    const { focus, setFocus, _handleFocus } = useFocus(disabled, onFocus);

    const _handleBlur = useCallback(
        (event) => {
            if (disabled) {
                event.stopPropagation();
                return;
            }

            if (onBlur) {
                onBlur(event);
            }

            setFocus(false);
        },
        [disabled, onBlur, setFocus]
    );

    return { focus, setFocus, _handleFocus, _handleBlur };
}
