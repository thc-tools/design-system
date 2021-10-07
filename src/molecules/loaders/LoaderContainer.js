// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function LoaderContainer({ children, className, ...otherProps }) {
    const rootClassName = classnames("thc-c-loader-container", className);

    return (
        <div {...otherProps} className={rootClassName}>
            {children}
        </div>
    );
}

LoaderContainer.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
};
