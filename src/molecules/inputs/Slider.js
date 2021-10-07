// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { FieldHoc } from "./Field";

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
}) {
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

Slider.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * If has error
     */
    hasError: PropTypes.bool,
    /**
     * If has success
     */
    hasSuccess: PropTypes.bool,
    /**
     * Helper text
     */
    helperText: PropTypes.string,
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Additional className for input
     */
    inputClassName: PropTypes.string,
    /**
     * Additional props for input
     */
    // eslint-disable-next-line react/forbid-prop-types
    inputProps: PropTypes.object,
    /**
     * Label
     */
    label: PropTypes.string,
    /**
     * Min value
     */
    min: PropTypes.number,
    /**
     * Max value
     */
    max: PropTypes.number,
    /**
     * Name
     */
    name: PropTypes.string,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Blur handler
     */
    onBlur: PropTypes.func,
    /**
     * Focus handler
     */
    onFocus: PropTypes.func,
    /**
     * If is read only
     */
    readOnly: PropTypes.func,
    /**
     * If is required
     */
    required: PropTypes.bool,
    /**
     * Step increment
     */
    step: PropTypes.number,
    /**
     * Value
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export const SliderField = FieldHoc(Slider, "Slider");
