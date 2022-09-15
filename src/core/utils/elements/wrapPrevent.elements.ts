/**
 * Wrap a handler function to handle preventDefault features and disabled state
 * @param {func} handlerFn Handler function
 * @param {bool} disabled If is disabled
 * @returns Wrapped handler
 */
export function wrapPrevent<E extends React.SyntheticEvent<any>, P extends any[]>(
    handlerFn?: (event: E, ...args: P) => void,
    disabled = false
): (event: E, ...args: P) => void {
    return function genericPreventHandler(event: E, ...args: P): void {
        if (event.defaultPrevented) {
            return;
        }

        if (handlerFn) {
            event.preventDefault();
        }

        if (!disabled && handlerFn) {
            handlerFn(event, ...args);
        }
    };
}
