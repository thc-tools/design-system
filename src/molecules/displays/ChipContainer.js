// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function ChipContainer({ children, className, condensed = false, ...otherProps }) {
    const containerClassName = classnames(
        "thc-c-chip-container",
        { "thc-c-chip-container__condensed": condensed },
        className
    );

    return (
        <div className={containerClassName} {...otherProps}>
            {children}
        </div>
    );
}

ChipContainer.propTypes = {
    /**
     * Children chips
     */
    children: PropTypes.node,
    /**
     * Additional className for container
     */
    className: PropTypes.string,
};
