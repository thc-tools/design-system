/**
 * To make an array of something or return the array
 * @param {any} element Element to arrayify
 * @returns Array
 */
export function arrayify(element) {
    if (Array.isArray(element)) {
        return element;
    }

    if (element) {
        return [element];
    }

    return [];
}
