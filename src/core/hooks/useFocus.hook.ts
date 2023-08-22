// Libs
import { useCallback, useState } from "react";

/**
 * Helper to handle focus state in JS
 * @param {bool} disabled If is disabled
 * @param {func} onFocus Focus handler
 * @returns { focus, setFocus, _handleFocus }
 */
export function useFocus(disabled = false, onFocus) {
    const [focus, setFocus] = useState(false);

    const _handleFocus = useCallback(
        (event) => {
            if (disabled) {
                event.stopPropagation();
                return;
            }

            if (onFocus) {
                onFocus(event);
            }

            setFocus(true);
        },
        [disabled, onFocus, setFocus]
    );

    return { focus, setFocus, _handleFocus };
}
