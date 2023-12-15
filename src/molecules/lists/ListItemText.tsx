// Libs
import clsx from "clsx";
import React from "react";

export interface ListItemTextProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Primary information
     */
    primary?: React.ReactNode;
    /**
     * Secondary information
     */
    secondary?: React.ReactNode;
}

export function ListItemText({ className, primary, secondary, ...otherProps }: ListItemTextProps) {
    const rootClassName = clsx("ds-c-list-item-text", className);
    const primaryClassName = clsx("ds-c-list-item-text__primary", "ds-u-typography--body");
    const secondaryClassName = clsx("ds-c-list-item-text__secondary", "ds-u-typography--body");

    return (
        <div {...otherProps} className={rootClassName}>
            <div className={primaryClassName}>{primary}</div>
            {secondary && <div className={secondaryClassName}>{secondary}</div>}
        </div>
    );
}
