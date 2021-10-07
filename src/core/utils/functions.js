/**
 * Safe chained function.
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 * @param {function} functions to chain
 * @returns {function|null}
 */
export function createChainedFunction(...funcs) {
    return funcs.reduce(
        (acc, func) => {
            if (func == null) {
                return acc;
            }

            return function chainedFunction(...args) {
                acc.apply(this, args);
                func.apply(this, args);
            };
        },
        () => {}
    );
}
