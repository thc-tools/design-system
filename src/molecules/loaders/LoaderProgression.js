// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function LoaderProgression({ className, hasError = false, hasWarning = false, percent = 0 }) {
    const rootClassName = classnames(
        "thc-c-loader-progression",
        {
            "thc-c-loader-progression--error": hasError,
            "thc-c-loader-progression--warning": hasWarning,
        },
        className
    );

    return (
        <div className={rootClassName}>
            <div style={{ width: `${percent}%` }} className="thc-c-loader-progression__progress-bar" />
        </div>
    );
}

LoaderProgression.propTypes = {
    /**
     * Additional className for loader
     */
    className: PropTypes.string,
    /**
     * If has error
     */
    hasError: PropTypes.bool,
    /**
     * If has warning
     */
    hasWarning: PropTypes.bool,
    /**
     * Percent of loading
     */
    percent: PropTypes.number,
};
