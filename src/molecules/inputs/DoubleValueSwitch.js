// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { ControlLabel, CONTROL_LABEL_POSITION } from "./ControlLabel";
import { FieldHoc } from "./Field";
import { Switch } from "./Switch";

export function DoubleValueSwitch({
    className,
    leftValue,
    leftValueLabel,
    rightValue,
    rightValueLabel,
    value,
    onChange,
}) {
    const rootClassName = classnames("thc-c-double-value-switch", className);

    return (
        <div className={rootClassName}>
            <ControlLabel
                className={classnames("thc-u-text--bold", {
                    "thc-u-text--skyblue": value === leftValue,
                    "thc-u-text--secondary": value !== leftValue,
                })}
                label={leftValueLabel}
                labelPosition={CONTROL_LABEL_POSITION.LEFT}
            >
                <ControlLabel
                    className={classnames("thc-u-text--bold", {
                        "thc-u-text--skyblue": value === rightValue,
                        "thc-u-text--secondary": value !== rightValue,
                    })}
                    label={rightValueLabel}
                    labelPosition={CONTROL_LABEL_POSITION.RIGHT}
                >
                    <Switch
                        disabledColorToggle
                        onChange={(e) => onChange(e.target.checked ? rightValue : leftValue)}
                        value={value === rightValue}
                    />
                </ControlLabel>
            </ControlLabel>
        </div>
    );
}

DoubleValueSwitch.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Left value
     */
    leftValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Left value label
     */
    leftValueLabel: PropTypes.string,
    /**
     * Right value
     */
    rightValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Right value label
     */
    rightValueLabel: PropTypes.string,
    /**
     * Value
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Handler to change value
     */
    onChange: PropTypes.func,
};

export const DoubleValueSwitchField = FieldHoc(DoubleValueSwitch, "DoubleValueSwitch");
