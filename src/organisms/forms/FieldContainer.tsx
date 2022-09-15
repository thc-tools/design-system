// Libs
import clsx from "clsx";
import React from "react";

export type FieldContainerOrientation = "horizontal" | "vertical" | "centered";

export interface FieldContainerProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Orientation
     */
    orientation?: FieldContainerOrientation;
}

export function FieldContainer({ children, className, orientation = "vertical" }: FieldContainerProps) {
    const rootClassName = clsx(
        "ds-c-field-container",
        {
            "ds-c-field-container--horizontal": ["horizontal", "centered"].includes(orientation),
            "ds-c-field-container--vertical": orientation === "vertical",
            "ds-c-field-container--centered": orientation === "centered",
        },
        className
    );

    return <div className={rootClassName}>{children}</div>;
}
