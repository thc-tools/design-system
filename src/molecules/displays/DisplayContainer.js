// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { DISPLAY_TYPES } from "./Display";

export const DISPLAY_CONTAINER_ORIENTATION = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
};

export function DisplayContainer({
    children,
    className,
    orientation = DISPLAY_CONTAINER_ORIENTATION.VERTICAL,
    displayType,
    ...otherProps
}) {
    const containerClassName = classnames(
        "thc-c-display-container",
        {
            "thc-c-display-container--horizontal": orientation === DISPLAY_CONTAINER_ORIENTATION.HORIZONTAL,
            "thc-c-display-container--vertical": orientation === DISPLAY_CONTAINER_ORIENTATION.VERTICAL,
            "thc-c-display-container--column": displayType === DISPLAY_TYPES.COLUMN,
            "thc-c-display-container--row": displayType === DISPLAY_TYPES.ROW,
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

DisplayContainer.propTypes = {
    /**
     * Display for nested displays
     */
    displayType: PropTypes.oneOf(Object.values(DISPLAY_TYPES)),
    /**
     * Children displays
     */
    children: PropTypes.node,
    /**
     * Additional className for container
     */
    className: PropTypes.string,
    /**
     * Orientation for container
     */
    orientation: PropTypes.oneOf(Object.values(DISPLAY_CONTAINER_ORIENTATION)),
};
