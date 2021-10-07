// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { FieldHoc } from "./Field";
import { ControlLabel, CONTROL_LABEL_POSITION } from "./ControlLabel";

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
}) {
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

Radio.propTypes = {
    /**
     * If radio is checked
     */
    checked: PropTypes.bool,
    /**
     * Additional className for circle
     */
    circleClassName: PropTypes.string,
    /**
     * Additional props for circle
     */
    circleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Additional className for the radio
     */
    className: PropTypes.string,
    /**
     * If disabled
     */
    disabled: PropTypes.bool,
    /**
     * If there has an error
     */
    hasError: PropTypes.bool,
    /**
     * Id for description element
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * Additional className for input
     */
    inputClassName: PropTypes.string,
    /**
     * Additional props for input
     */
    inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Label for radio
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * Additional className for label
     */
    labelClassName: PropTypes.string,
    /**
     * Position for label
     */
    labelPosition: PropTypes.oneOf(Object.values(CONTROL_LABEL_POSITION)),
    /**
     * Additional props for label
     */
    labelProps: PropTypes.shape(ControlLabel.propTypes),
    /**
     * Name of the input
     */
    name: PropTypes.string.isRequired,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Change handler
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Focus handler
     */
    onFocus: PropTypes.func,
    /**
     * Blur handler
     */
    onBlur: PropTypes.func,
    /**
     * Additional className for thumb
     */
    thumbClassName: PropTypes.string,
    /**
     * Additional props for thumb
     */
    thumbProps: PropTypes.string,
    /**
     * Value of the input
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

export const RadioField = FieldHoc(Radio, "Radio");
