import { DebouncedState, Options, useDebouncedCallback } from "use-debounce";

export const USE_DEBOUNCE_DEFAULT_TIMEOUT = 300;

/**
 * Use debounce hook
 * @param {func} callback Callback to debounce
 * @param {*} timeoutProp Timeout to use for debounce
 * @param {*} options Options for debounce
 * @returns Debounced callback
 */
export function useDebounce<T extends (...args: any[]) => ReturnType<T>>(
    callback: T,
    timeout = USE_DEBOUNCE_DEFAULT_TIMEOUT,
    options: Options = {}
): DebouncedState<T> {
    return useDebouncedCallback<T>(callback, timeout, options);
}
