import { useDebouncedCallback } from "use-debounce";

export const USE_DEBOUNCE_DEFAULT_TIMEOUT = 300;

/**
 * Use debounce hook
 * @param {func} callback Callback to debounce
 * @param {*} timeout Timeout to use for debounce
 * @param {*} options Options for debounce
 * @returns Debounced callback
 */
export function useDebounce(callback, timeout = USE_DEBOUNCE_DEFAULT_TIMEOUT, options) {
    return useDebouncedCallback(callback, timeout, options);
}
