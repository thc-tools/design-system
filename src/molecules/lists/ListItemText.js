// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function ListItemText({ className, primary, secondary, ...otherProps }) {
    const rootClassName = classnames("thc-c-list-item-text", className);

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="thc-c-list-item-text__primary">{primary}</div>
            {secondary && <div className="thc-c-list-item-text__secondary">{secondary}</div>}
        </div>
    );
}

ListItemText.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Primary information
     */
    primary: PropTypes.node,
    /**
     * Secondary information
     */
    secondary: PropTypes.node,
};
