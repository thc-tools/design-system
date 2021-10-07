// Libs
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { Icon } from "../icons";
import { ControlLabel, CONTROL_LABEL_POSITION } from "./ControlLabel";
import { FieldHoc } from "./Field";

export function Checkbox({
    boxClassName: boxClassNameProp,
    boxProps,
    checked = false,
    className,
    disabled = false,
    hasError = false,
    id,
    iconClassName: iconClassNameProp,
    iconProps,
    indeterminate = false,
    inputClassName: inputClassNameProp,
    inputProps,
    label,
    labelClassName,
    labelPosition,
    labelProps,
    name,
    onClick,
    onChange,
    onFocus,
    onBlur,
    required = false,
    value,
    ...otherProps
}) {
    const rootClassName = classnames(
        "thc-c-checkbox",
        {
            "thc-c-checkbox--error": hasError && !disabled,
            "thc-c-checkbox--checked": checked,
            "thc-c-checkbox--indeterminate": indeterminate,
        },
        className
    );
    const inputClassName = classnames("thc-c-checkbox__input", inputClassNameProp);
    const boxClassName = classnames("thc-c-checkbox__box", boxClassNameProp);
    const iconClassName = classnames("thc-c-checkbox__icon", iconClassNameProp);

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

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
                    ref={inputRef}
                    required={required}
                    type="checkbox"
                    value={value}
                />
                <div {...filterProps(boxProps)} className={boxClassName}>
                    {checked && (
                        <Icon {...iconProps} className={iconClassName}>
                            check
                        </Icon>
                    )}
                    {indeterminate && <div className="thc-c-checkbox__indeterminate" />}
                </div>
            </div>
        </ControlLabel>
    );
}

Checkbox.propTypes = {
    /**
     * Additional className for box
     */
    boxClassName: PropTypes.string,
    /**
     * Additional props for box
     */
    boxProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Additional className for the checkbox
     */
    className: PropTypes.string,
    /**
     * if it is disabled
     */
    disabled: PropTypes.bool,
    /**
     * if there is an error
     */
    hasError: PropTypes.bool,
    /**
     * Id for description element
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Additional className for icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for icon
     */
    iconProps: PropTypes.shape(Icon.propTypes),
    /**
     * If is indeterminate
     */
    indeterminate: PropTypes.bool,
    /**
     * Additional for input
     */
    inputClassName: PropTypes.string,
    /**
     * Additional for input
     */
    inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Label for switch
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
    labelProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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
     * Value of the input
     */
    value: PropTypes.bool,
};

export const CheckboxField = FieldHoc(Checkbox, "Checkbox");
