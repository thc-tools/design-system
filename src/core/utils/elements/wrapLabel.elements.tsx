// Libs
import clsx from "clsx";
import React from "react";

/**
 * Wrap child in a span if it is a string
 * @param {React.Element} child Child element
 */
export function wrapLabel(child: React.ReactNode, className?: string): React.ReactNode {
    if (typeof child === "string" || typeof child === "number") {
        return <span className={className}>{child}</span>;
    }

    if (React.isValidElement(child)) {
        return React.cloneElement(child, { ...child.props, className: clsx(className, child.props.className) });
    }

    return child;
}
