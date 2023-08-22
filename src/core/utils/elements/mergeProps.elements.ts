// Libs
import React from "react";
import classnames from "classnames";

/**
 * Merge props into components with special care for className
 * @param {React.node} element Child element(s)
 * @param {object} props Props to merge
 */
export function mergeProps(element, { className: classNameB, ...otherPropsB }) {
    if (typeof element === "undefined" || element === null || !React.isValidElement(element)) {
        return element;
    }

    const { className: classNameA, ...otherPropsA } = element.props ?? {};

    return React.cloneElement(element, {
        ...otherPropsA,
        ...otherPropsB,
        className: classnames(classNameA, classNameB),
    });
}
