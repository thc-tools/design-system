// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { filterProps } from "../../core/utils";

export function ListItemContent({ children, className, onClick, ...otherProps }) {
    const rootClassName = classnames("thc-c-list-item-content", className);

    return (
        <div className={rootClassName} onClick={onClick} {...filterProps(otherProps)}>
            {children}
        </div>
    );
}

ListItemContent.propTypes = {
    /**
     * Children to render
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
};
