// Libs
import { compact } from "lodash";

// Utils

import * as reactEvents from "./_events";
import { htmlAttributes } from "./_html-attributes";

const allReactEvents = compact(Object.values(reactEvents));

/**
 * Filter the initial props, so only valid props are passed through.
 * @param {object} props The initial props
 * @returns The filtered props
 */
export function filterProps(props) {
    if (typeof props === "undefined") {
        return undefined;
    }

    return Object.entries(props).reduce((acc, [key, value]) => {
        if (
            key.startsWith("data-") ||
            key.startsWith("aria-") ||
            allReactEvents.includes(key) ||
            htmlAttributes.includes(key)
        ) {
            return { ...acc, [key]: value };
        }

        return acc;
    }, {});
}
