// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { FieldHoc } from "./Field";
import { Radio, RadioProps } from "./Radio";
import { RadioCard } from "./RadioCard";
import { FieldOption } from "./_utils";

export type RadioGroupType = "radio" | "card";

const RADIO_GROUP_TYPE_MAPPER: Record<RadioGroupType, React.FunctionComponent<any>> = {
    radio: Radio,
    card: RadioCard,
};

export interface RadioGroupProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * If has error
     */
    hasError?: boolean;
    /**
     * Identifier
     */
    id?: string;
    /**
     * Name for input
     */
    name: string;
    /**
     * Change handler
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Options
     */
    options: FieldOption[];
    /**
     * Override Radio component
     */
    RadioComponent?: React.FunctionComponent<any>;
    /**
     * Additional props for radio
     */
    radioProps?: RadioProps;
    /**
     * Type of radio
     */
    type?: RadioGroupType;
    /**
     * Value
     */
    value: number | string | undefined;
}

export function RadioGroup({
    className,
    disabled = false,
    hasError,
    id,
    name,
    onChange,
    options = [],
    RadioComponent: RadioComponentProp,
    radioProps,
    type: typeProp,
    value,
    ...otherProps
}: RadioGroupProps) {
    const rootClassName = classnames("thc-c-radio-group", className);

    const type = typeProp ?? "radio";
    const RadioComponent = RadioComponentProp ?? RADIO_GROUP_TYPE_MAPPER[type];

    return (
        <div {...filterProps(otherProps)} className={rootClassName} disabled={disabled === true}>
            {options.map(({ value: optionValue, disabled: optionDisabled, label: primary, ...otherOptionProps }) => (
                <RadioComponent
                    key={optionValue}
                    {...radioProps}
                    {...otherOptionProps}
                    primary={primary}
                    checked={optionValue === value}
                    disabled={optionDisabled || disabled}
                    hasError={hasError}
                    id={`${id}-${optionValue}`}
                    name={name}
                    onChange={onChange}
                    value={optionValue}
                />
            ))}
        </div>
    );
}

export const RadioGroupField = FieldHoc(RadioGroup, "RadioGroup");
