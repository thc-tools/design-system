// Libs
import React from "react";
import { compact } from "lodash";

// Utils
import { mergeProps } from "./mergeProps.elements";
import { wrapLabel } from "./wrapLabel.elements";

/**
 * Merge props into components with care for nullish components and complex structure
 * @param {React.node} children Child element(s)
 * @param {object} props Props to merge
 */
export function alterElement(children, props) {
    if (typeof children === "undefined" || children === null) {
        return;
    }

    return Array.isArray(children)
        ? React.Children.map(compact(children), (child) => mergeProps(wrapLabel(child), props))
        : mergeProps(wrapLabel(children), props);
}
