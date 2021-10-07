// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function MenuSeparator({ className, ...otherProps }) {
    const separatorClassName = classnames("thc-c-menu-separator", className);

    return <li {...otherProps} className={separatorClassName} role="separator" />;
}

MenuSeparator.propTypes = {
    /**
     * Additional className for separator
     */
    className: PropTypes.string,
};
