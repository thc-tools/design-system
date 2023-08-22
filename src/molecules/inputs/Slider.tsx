// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { FieldHoc } from "./Field";
import { InputProps } from "./Input";

export interface SliderProps {
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
     * If has success
     */
    hasSuccess?: boolean;
    /**
     * Helper text
     */
    helperText?: string;
    /**
     * Identifier
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
     * Label
     */
    label?: string;
    /**
     * Min value
     */
    min?: number;
    /**
     * Max value
     */
    max?: number;
    /**
     * Name
     */
    name: string;
    /**
     * Change handler
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
     * If is read only
     */
    readOnly?: boolean;
    /**
     * If is required
     */
    required?: boolean;
    /**
     * Step increment
     */
    step?: number;
    /**
     * Value
     */
    value?: number | string | undefined;
}

export function Slider({
    className,
    disabled = false,
    hasError = false,
    hasSuccess = false,
    helperText,
    id,
    inputProps,
    inputClassName: inputClassNameProp,
    label,
    min,
    max,
    name,
    onChange,
    onClick,
    onBlur,
    onFocus,
    readOnly = false,
    required = false,
    step,
    value,
    ...otherProps
}: SliderProps) {
    const rootClassName = classnames(
        "thc-c-slider",
        {
            "thc-c-slider--error": !disabled && hasError,
            "thc-c-slider--success": !disabled && hasSuccess,
        },
        className
    );
    const inputClassName = classnames("thc-c-slider__input", inputClassNameProp);
    const labelClassName = classnames("thc-c-slider__label thc-u-text--bold", {
        "thc-u-status--error": !disabled && hasError,
        "thc-u-status--success": !disabled && hasSuccess,
    });

    return (
        <div {...filterProps(otherProps)} className={rootClassName} disabled={disabled === true}>
            <div className="thc-c-slider__texts">
                <span className={labelClassName}>{label}</span>
                <span className="thc-c-slider__helper-text">{helperText}</span>
            </div>
            <input
                {...filterProps(inputProps)}
                className={inputClassName}
                disabled={disabled}
                id={id}
                min={min}
                max={max}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onClick={onClick}
                onFocus={onFocus}
                readOnly={readOnly}
                required={required}
                step={step}
                style={{
                    "--val": value,
                    "--min": min,
                    "--max": max,
                }}
                type="range"
            />
            <div className="thc-c-slider__minmax">
                <div className="thc-c-slider__min">{min}</div>
                <div className="thc-c-slider__max">{max}</div>
            </div>
        </div>
    );
}

export const SliderField = FieldHoc(Slider, "Slider");
