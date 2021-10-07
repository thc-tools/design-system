// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function StepConnector({ className }) {
    const rootClassName = classnames("thc-c-step-connector", className);

    return (
        <div className={rootClassName}>
            <span className="thc-c-step-connector__line" />
        </div>
    );
}

StepConnector.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
};
