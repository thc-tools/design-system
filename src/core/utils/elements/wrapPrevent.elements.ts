/**
 * Wrap a handler function to handle preventDefault features and disabled state
 * @param {func} handlerFn Handler function
 * @param {bool} disabled If is disabled
 * @returns Wrapped handler
 */
export function wrapPrevent<
    T extends Element,
    E extends Event,
    SE extends React.SyntheticEvent<T, E>,
    F extends React.EventHandler<SE>
>(handlerFn?: F, disabled = false): F {
    return function genericPreventHandler(event: SE, ...args): void {
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
