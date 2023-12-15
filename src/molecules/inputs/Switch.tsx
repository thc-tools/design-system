// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { filterProps } from "../../core/utils";

// Components
import { ControlLabel, ControlLabelPosition, ControlLabelProps } from "./ControlLabel";
import { FieldHoc } from "./Field";

export interface SwitchProps {
    /**
     * If is checked
     */
    checked?: boolean;
    /**
     * Additional className for switch
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * If color toggle is disabled
     */
    disabledColorToggle?: boolean;
    /**
     * If has error
     */
    hasError?: boolean;
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
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>; // eslint-disable-line react/forbid-prop-types
    /**
     * Label for switch
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
     * Name of input
     */
    name: string;
    /**
     * Blur handler
     */
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Change handler
     */
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLInputElement>;
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
    thumbProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    /**
     * Value (overridden by checked)
     */
    value?: boolean;
}

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
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    {
        checked: checkedProp,
        className,
        disabled = false,
        disabledColorToggle = false,
        hasError = false,
        id,
        inputClassName: inputClassNameProp,
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
    },
    ref
) {
    const checked = Boolean(checkedProp ?? value);

    const switchClassName = clsx(
        "ds-c-switch",
        {
            "ds-c-switch--error": !disabled && hasError,
            "ds-c-switch--checked": checked,
            "ds-c-switch--disabled-color-toggle": disabledColorToggle,
        },
        className
    );
    const inputClassName = clsx("ds-c-switch__input", inputClassNameProp);
    const thumbClassName = clsx("ds-c-switch__thumb", thumbClassNameProp);

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
                    ref={ref}
                    required={required}
                    type="checkbox"
                />
                <span {...filterProps(thumbProps)} className={thumbClassName} />
            </div>
        </ControlLabel>
    );
});

export const SwitchField = FieldHoc(Switch, "Switch");
