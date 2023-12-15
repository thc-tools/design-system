// Libs
import { useCallback, useState } from "react";

/**
 * Helper to handle focus state in JS
 * @param {bool} disabled If is disabled
 * @param {func} onFocus Focus handler
 * @returns { focus, setFocus, _handleFocus }
 */
export function useFocus(
    disabled = false,
    onFocus?: (focus: React.FocusEvent<any>) => void
): {
    focus: boolean;
    setFocus: (focus: boolean) => void;
    _handleFocus: (event: React.FocusEvent<any>) => void;
} {
    const [focus, setFocus] = useState(false);

    const _handleFocus = useCallback(
        (event: React.FocusEvent<any>) => {
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
