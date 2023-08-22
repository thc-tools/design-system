// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { DisplayType } from "./Display";

export type DisplayContainerOrientation = "horizontal" | "vertical";

export interface DisplayContainerProps extends React.PropsWithChildren<{}> {
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
    const containerClassName = classnames(
        "thc-c-display-container",
        {
            "thc-c-display-container--horizontal": orientation === "horizontal",
            "thc-c-display-container--vertical": orientation === "vertical",
            "thc-c-display-container--column": displayType === "column",
            "thc-c-display-container--row": displayType === "row",
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
