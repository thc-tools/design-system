// Libs
import classnames from "classnames";
import React from "react";

export type FieldContainerOrientation = "horizontal" | "vertical" | "centered";

export interface FieldContainerProps extends React.PropsWithChildren<{}> {
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
    const rootClassName = classnames(
        "thc-c-field-container",
        {
            "thc-c-field-container--horizontal": ["horizontal", "centered"].includes(orientation),
            "thc-c-field-container--vertical": orientation === "vertical",
            "thc-c-field-container--centered": orientation === "centered",
        },
        className
    );

    return <div className={rootClassName}>{children}</div>;
}
