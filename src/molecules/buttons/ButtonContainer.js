// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function ButtonContainer({ children, className }) {
    const rootClassName = classnames("thc-c-button-container", className);

    return <div className={rootClassName}>{children}</div>;
}

ButtonContainer.propTypes = {
    /**
     * Children
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
};
