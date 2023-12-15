// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { DisplayType } from "./Display";

export type DisplayContainerOrientation = "horizontal" | "vertical";

export interface DisplayContainerProps extends React.PropsWithChildren<unknown> {
    /**
     * Display for nested displays
     */
    displayType?: DisplayType;
    /**
     * Additional className for container
     */
    className?: string;
    /**
     * Orientation for container
     */
    orientation?: DisplayContainerOrientation;
}

export function DisplayContainer({
    children,
    className,
    orientation = "vertical",
    displayType,
    ...otherProps
}: DisplayContainerProps) {
    const containerClassName = clsx(
        "ds-c-display-container",
        {
            "ds-c-display-container--horizontal": orientation === "horizontal",
            "ds-c-display-container--vertical": orientation === "vertical",
            "ds-c-display-container--column": displayType === "column",
            "ds-c-display-container--row": displayType === "row",
        },
        className
    );

    return (
        <div className={containerClassName} {...otherProps}>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? alterElement(child, { type: child.props.type ?? displayType }) : child
            )}
        </div>
    );
}
