// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function BubbleValueContainer({ children, className }) {
    const rootClassName = classnames("thc-c-bubble-container", className);

    return <div className={rootClassName}>{children}</div>;
}

BubbleValueContainer.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
};
