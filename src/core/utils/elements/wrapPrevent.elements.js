/**
 * Wrap a handler function to handle preventDefault features and disabled state
 * @param {func} handlerFn Handler function
 * @param {bool} disabled If is disabled
 * @returns Wrapped handler
 */
export function wrapPrevent(handlerFn, disabled = false) {
    return function genericPreventHandler(event, payload) {
        if (event.defaultPrevented) {
            return;
        }

        if (handlerFn) {
            event.preventDefault();
        }
        if (!disabled && handlerFn) {
            handlerFn(event, payload);
        }
    };
}
