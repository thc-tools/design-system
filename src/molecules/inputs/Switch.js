// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { FieldHoc } from "./Field";
import { ControlLabel, CONTROL_LABEL_POSITION } from "./ControlLabel";

/**
 * Switches toggle the state of a single setting on or off.
 *
 * ```js
 * import { SwitchField } from "./components/molecules/inputs"
 * ```
 *
 * ℹ️ `SwitchField`'s props are the join of props from `Switch` and `Field`
 *
 * Or bare version:
 *
 * ```js
 * import { Switch } from "./components/molecules/inputs"
 * ```
 */
export function Switch({
    checked: checkedProp,
    className,
    disabled = false,
    disabledColorToggle = false,
    hasError = false,
    id,
    inputClassName: inputClassNameProp,
    inputRef,
    inputProps,
    label,
    labelClassName,
    labelPosition,
    labelProps,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    required,
    thumbClassName: thumbClassNameProp,
    thumbProps,
    value = false,
    ...otherProps
}) {
    const checked = Boolean(checkedProp ?? value);

    const switchClassName = classnames(
        "thc-c-switch",
        {
            "thc-c-switch--error": !disabled && hasError,
            "thc-c-switch--checked": checked,
            "thc-c-switch--disabled-color-toggle": disabledColorToggle,
        },
        className
    );
    const inputClassName = classnames("thc-c-switch__input", inputClassNameProp);
    const thumbClassName = classnames("thc-c-switch__thumb", thumbClassNameProp);

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
            <div {...filterProps(otherProps)} className={switchClassName} disabled={disabled === true}>
                <input
                    {...filterProps(inputProps)}
                    checked={checked}
                    className={inputClassName}
                    disabled={disabled === true}
                    id={id}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    onClick={onClick}
                    onFocus={onFocus}
                    ref={inputRef}
                    required={required}
                    type="checkbox"
                />
                <span {...filterProps(thumbProps)} className={thumbClassName} />
            </div>
        </ControlLabel>
    );
}

Switch.propTypes = {
    /**
     * If is checked
     */
    checked: PropTypes.bool,
    /**
     * Additional className for switch
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
    labelProps: PropTypes.shape(ControlLabel.propTypes),
    /**
     * Name of input
     */
    name: PropTypes.string,
    /**
     * Blur handler
     */
    onBlur: PropTypes.func,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Focus handler
     */
    onFocus: PropTypes.func,
    /**
     * Ref to the inner input
     */
    ref: PropTypes.func,
    /**
     * If is required
     */
    required: PropTypes.bool,
    /**
     * Additional className for thumb
     */
    thumbClassName: PropTypes.string,
    /**
     * Additional props for thumb
     */
    thumbProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /**
     * Value (overridden by checked)
     */
    value: PropTypes.bool,
};

export const SwitchField = FieldHoc(Switch, "Switch");
