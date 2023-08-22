// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { DivProps, filterProps } from "../../core/utils";

// Components
import { ControlLabel, ControlLabelPosition, ControlLabelProps } from "./ControlLabel";
import { FieldHoc } from "./Field";
import { InputProps } from "./Input";

export interface RadioProps {
    /**
     * If radio is checked
     */
    checked?: boolean;
    /**
     * Additional className for circle
     */
    circleClassName?: string;
    /**
     * Additional props for circle
     */
    circleProps?: DivProps;
    /**
     * Additional className for the radio
     */
    className?: string;
    /**
     * If disabled
     */
    disabled?: boolean;
    /**
     * If there has an error
     */
    hasError?: boolean;
    /**
     * Id for description element
     */
    id?: string;
    /**
     * Additional className for input
     */
    inputClassName?: string;
    /**
     * Additional props for input
     */
    inputProps?: InputProps;
    /**
     * Label for radio
     */
    label?: React.ReactNode;
    /**
     * Additional className for label
     */
    labelClassName?: string;
    /**
     * Position for label
     */
    labelPosition?: ControlLabelPosition;
    /**
     * Additional props for label
     */
    labelProps?: ControlLabelProps;
    /**
     * Name of the input
     */
    name: string;
    /**
     * Change handler
     */
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Blur handler
     */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Focus handler
     */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * If is required
     */
    required?: boolean;
    /**
     * Additional className for thumb
     */
    thumbClassName?: string;
    /**
     * Additional props for thumb
     */
    thumbProps?: DivProps;
    /**
     * Value of the input
     */
    value?: number | string | undefined;
}

export function Radio({
    checked = false,
    circleClassName: circleClassNameProp,
    circleProps,
    className,
    disabled = false,
    hasError = false,
    id,
    inputClassName: inputClassNameProp,
    inputProps,
    label,
    labelClassName: labelClassNameProp,
    labelProps,
    labelPosition,
    name,
    onClick,
    onChange,
    onFocus,
    onBlur,
    required = false,
    thumbClassName: thumbClassNameProp,
    thumbProps,
    value,
    ...otherProps
}: RadioProps) {
    const rootClassName = classnames(
        "thc-c-radio",
        {
            "thc-c-radio--error": hasError && !disabled,
            "thc-c-radio--checked": checked,
        },
        className
    );

    const inputClassName = classnames("thc-c-radio__input", inputClassNameProp);
    const circleClassName = classnames("thc-c-radio__circle", circleClassNameProp);
    const thumbClassName = classnames("thc-c-radio__thumb", thumbClassNameProp);
    const labelClassName = classnames("thc-c-radio__label", labelClassNameProp);

    return (
        <ControlLabel
            {...labelProps}
            disabled={disabled}
            hasError={hasError}
            id={id}
            label={label}
            className={labelClassName}
            labelPosition={labelPosition}
        >
            <div {...filterProps(otherProps)} className={rootClassName} disabled={disabled === true}>
                <input
                    {...filterProps(inputProps)}
                    checked={checked}
                    className={inputClassName}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onClick={onClick}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    required={required}
                    type="radio"
                    value={value}
                />
                <div {...filterProps(circleProps)} className={circleClassName}>
                    <span {...filterProps(thumbProps)} className={thumbClassName} />
                </div>
            </div>
        </ControlLabel>
    );
}

export const RadioField = FieldHoc(Radio, "Radio");
