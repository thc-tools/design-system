// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function CardSeparator({ className, fullWidth = false, ...otherProps }) {
    const separatorClassName = classnames(
        "thc-c-card__separator",
        { "thc-c-card__separator--full-width": fullWidth },
        className
    );

    return <div {...otherProps} className={separatorClassName} />;
}

CardSeparator.propTypes = {
    /**
     * Additional className for separator
     */
    className: PropTypes.string,
    /**
     * If separator is full width
     */
    fullWidth: PropTypes.bool,
};
