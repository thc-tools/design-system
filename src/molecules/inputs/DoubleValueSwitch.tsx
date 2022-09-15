// Libs
import clsx from "clsx";

// Components
import { ControlLabel } from "./ControlLabel";
import { FieldHoc } from "./Field";
import { Switch } from "./Switch";

export interface DoubleValueSwitchProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Left value
     */
    leftValue: number | string | undefined;
    /**
     * Left value label
     */
    leftValueLabel?: string;
    /**
     * Name of input
     */
    name: string;
    /**
     * Right value
     */
    rightValue: number | string | undefined;
    /**
     * Right value label
     */
    rightValueLabel?: string;
    /**
     * Value
     */
    value: number | string | undefined;
    /**
     * Handler to change value
     */
    onChange: (value: number | string | undefined) => void;
}

export function DoubleValueSwitch({
    className,
    leftValue,
    leftValueLabel,
    name,
    rightValue,
    rightValueLabel,
    value,
    onChange,
}: DoubleValueSwitchProps) {
    const rootClassName = clsx("ds-c-double-value-switch", className);

    return (
        <div className={rootClassName}>
            <ControlLabel
                className={clsx("ds-u-text--bold", {
                    "ds-u-text--skyblue": value === leftValue,
                    "ds-u-text--secondary": value !== leftValue,
                })}
                label={leftValueLabel}
                labelPosition="left"
            >
                <ControlLabel
                    className={clsx("ds-u-text--bold", {
                        "ds-u-text--skyblue": value === rightValue,
                        "ds-u-text--secondary": value !== rightValue,
                    })}
                    label={rightValueLabel}
                    labelPosition="right"
                >
                    <Switch
                        checked={value === rightValue}
                        disabledColorToggle
                        name={name}
                        onChange={(e) => onChange(e.target.checked ? rightValue : leftValue)}
                    />
                </ControlLabel>
            </ControlLabel>
        </div>
    );
}

export const DoubleValueSwitchField = FieldHoc(DoubleValueSwitch, "DoubleValueSwitch");
