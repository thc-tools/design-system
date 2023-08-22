// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export interface StepConnectorProps {
    /**
     * Additional className
     */
    className?: string;
}

export function StepConnector({ className }: StepConnectorProps) {
    const rootClassName = classnames("thc-c-step-connector", className);

    return (
        <div className={rootClassName}>
            <span className="thc-c-step-connector__line" />
        </div>
    );
}
