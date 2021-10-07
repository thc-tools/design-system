/**
 * Wrap a handler function to be compliant with onKeyUp for SPACE and ENTER keys
 * @param {func} handlerFn Handler function
 * @returns Wrapped handler function
 */
export function wrapKeyUp(handlerFn) {
    return function genericKeyUpHandler(event, payload) {
        if (!event.keyCode) {
            return;
        }

        if (["Enter", " "].includes(event.key)) {
            handlerFn(event, payload);
        }
    };
}
