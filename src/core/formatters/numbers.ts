import { isInteger } from "lodash/fp";

/**
 * Format a value
 * @param {number} num Number to format
 * @param {*} precision Precision to use (@default 2)
 * @returns Formatter value
 */
export function formatNumber(num, precision = 2) {
    if (num === undefined || num === null) {
        return "";
    }

    // Old behavior is wanted
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(num)) {
        throw new Error("formatNumber: input must be a number");
    }

    if (num >= 1000000000 || num <= -1000000000) {
        return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")} B`;
    }

    if (num >= 1000000 || num <= -1000000) {
        return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")} M`;
    }

    if (num >= 10000 || num <= -10000) {
        return `${(num / 1000).toFixed(1).replace(/\.0$/, "")} K`;
    }

    if (isInteger(+num)) {
        return Math.floor(num).toString();
    }

    return Number(num).toFixed(precision);
}

/**
 * Test if a value is a number or a float
 * @param {any} value Value to test
 * @returns {bool} Test result
 */
export function isNumberOrFloat(value) {
    return /\d+$/.test(value) || /\d+\.\d+$/.test(value);
}

/**
 * Format a number as a percent
 * @param {number} num Number to format
 * @param {bool} convert Convert to base 100
 * @returns Formatted number
 */
export function formatPercentage(num, convert = false) {
    return `${formatNumber(num * (convert ? 100 : 1), 2)} %`;
}
