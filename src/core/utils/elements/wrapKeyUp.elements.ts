/**
 * Wrap a handler function to be compliant with onKeyUp for SPACE and ENTER keys
 * @param {func} handlerFn Handler function
 * @returns Wrapped handler function
 */
export function wrapKeyUp<E extends Element>(handlerFn: React.MouseEventHandler<E>): React.KeyboardEventHandler<E> {
    return function genericKeyUpHandler(event: React.KeyboardEvent<E>, ...args) {
        if (!event.code) {
            return;
        }

        if (["Enter", " "].includes(event.key)) {
            handlerFn(event as unknown as React.MouseEvent<E>, ...args);
        }
    };
}
