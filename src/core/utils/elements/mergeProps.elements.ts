// Libs
import clsx from "clsx";
import React from "react";

/**
 * Merge props into components with special care for className
 * @param {React.node} element Child element(s)
 * @param {object} props Props to merge
 */
export function mergeProps(
    element: React.ReactNode,
    { className: classNameB, ...otherPropsB }: Record<string, unknown>
) {
    if (typeof element === "undefined" || element === null || !React.isValidElement(element)) {
        return element;
    }

    const { className: classNameA, ...otherPropsA } = element.props ?? {};

    return React.cloneElement(element, {
        ...otherPropsA,
        ...otherPropsB,
        className: clsx(classNameA, classNameB),
    });
}
