// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Icon, ICON_SIZE } from "../icons";
import { StepConnector } from "./StepConnector";
import { useStep } from "./StepContext";

const number = ["one", "two", "three"];

export function Step({ active: activeProp, className, completed: completedProp, index, label, ...otherProps }) {
    const { activeStep } = useStep();

    const active = activeProp ?? index === activeStep;
    const completed = completedProp ?? activeStep > index;

    const rootClassName = classnames(
        "thc-c-step",
        {
            "thc-c-step--active": active,
            "thc-c-step--completed": completed,
        },
        className
    );

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="thc-c-step__label thc-u-text--subtitle">{label}</div>
            <Icon className="thc-c-step__icon" size={ICON_SIZE.M}>
                {completed ? "success" : `number-${number[index]}`}
            </Icon>

            {index !== 0 && <StepConnector />}
        </div>
    );
}

Step.propTypes = {
    /**
     * If is active
     */
    active: PropTypes.bool,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is completed
     */
    completed: PropTypes.bool,
    /**
     * Index
     */
    index: PropTypes.number,
    /**
     * Label
     */
    label: PropTypes.string,
};
