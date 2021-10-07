// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function ListItemActions({ children, className }) {
    const rootClassName = classnames("thc-c-list-item-actions", className);

    return <div className={rootClassName}>{children}</div>;
}

ListItemActions.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
};
