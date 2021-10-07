// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function Menu({ children, className, ...otherProps }) {
    const menuClassName = classnames("thc-o-paper", "thc-c-menu", className);

    return (
        <div {...otherProps} className={menuClassName}>
            {children}
        </div>
    );
}

Menu.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for menu
     */
    className: PropTypes.string,
};
