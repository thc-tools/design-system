// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function FormActions({ children, className }) {
    const rootClassName = classnames("thc-c-form-actions", className);

    return <div className={rootClassName}>{children}</div>;
}

FormActions.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
};
