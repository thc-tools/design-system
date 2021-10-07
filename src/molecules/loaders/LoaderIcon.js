// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function LoaderIcon({ className }) {
    const rootClassName = classnames("thc-c-loader-icon", className);

    return (
        <div className={rootClassName}>
            <div className="thc-c-loader-icon__ball thc-c-loader-icon__a" />
            <div className="thc-c-loader-icon__ball thc-c-loader-icon__b" />
            <div className="thc-c-loader-icon__ball thc-c-loader-icon__c" />
        </div>
    );
}

LoaderIcon.propTypes = {
    /**
     * Additional className for loader
     */
    className: PropTypes.string,
};
