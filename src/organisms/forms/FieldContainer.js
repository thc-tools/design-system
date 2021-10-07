// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const FIELD_CONTAINER_ORIENTATION = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
    CENTERED: "centered",
};

export function FieldContainer({ children, className, orientation = FIELD_CONTAINER_ORIENTATION.VERTICAL }) {
    const rootClassName = classnames(
        "thc-c-field-container",
        {
            "thc-c-field-container--horizontal": [
                FIELD_CONTAINER_ORIENTATION.HORIZONTAL,
                FIELD_CONTAINER_ORIENTATION.CENTERED,
            ].includes(orientation),
            "thc-c-field-container--vertical": orientation === FIELD_CONTAINER_ORIENTATION.VERTICAL,
            "thc-c-field-container--centered": orientation === FIELD_CONTAINER_ORIENTATION.CENTERED,
        },
        className
    );

    return <div className={rootClassName}>{children}</div>;
}

FieldContainer.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Orientation
     */
    orientation: PropTypes.oneOf(Object.values(FIELD_CONTAINER_ORIENTATION)),
};
