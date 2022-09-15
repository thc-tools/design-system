// Libs
import clsx from "clsx";
import React, { useEffect, useRef } from "react";

// Utils
import { RDivProps, filterProps } from "../../core/utils";

// Components
import { Icon, IconProps } from "../icons";
import { ControlLabel, ControlLabelPosition, ControlLabelProps } from "./ControlLabel";
import { FieldHoc } from "./Field";

export interface CheckboxProps {
    /**
     * Additional className for box
     */
    boxClassName?: string;
    /**
     * Additional props for box
     */
    boxProps?: RDivProps;
    /**
     * If is checked
     */
    checked: boolean;
    /**
     * Additional className for the checkbox
     */
    className?: string;
    /**
     * Additional container className
     */
    containerClassName?: string;
    /**
     * if it is disabled
     */
    disabled?: boolean;
    /**
     * if there is an error
     */
    hasError?: boolean;
    /**
     * Id for description element
     */
    id?: string;
    /**
     * Additional className for icon
     */
    iconClassName?: string;
    /**
     * Additional props for icon
     */
    iconProps?: IconProps;
    /**
     * If is indeterminate
     */
    indeterminate?: boolean;
    /**
     * Additional for input
     */
    inputClassName?: string;
    /**
     * Additional for input
     */
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    /**
     * Label for checkbox
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
     * Value of the input
     */
    value: string | number | undefined;
}

export function Checkbox({
    boxClassName: boxClassNameProp,
    boxProps,
    checked = false,
    className: classNameProp,
    containerClassName: containerClassNameProp,
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
}: CheckboxProps): JSX.Element {
    const className = clsx(
        "ds-c-checkbox",
        {
            "ds-c-checkbox--error": hasError && !disabled,
            "ds-c-checkbox--checked": checked,
            "ds-c-checkbox--indeterminate": indeterminate,
        },
        labelClassName,
        classNameProp
    );
    const containerClassName = clsx("ds-c-checkbox__container", containerClassNameProp);
    const inputClassName = clsx("ds-c-checkbox__input", inputClassNameProp);
    const boxClassName = clsx("ds-c-checkbox__box", boxClassNameProp);
    const iconClassName = clsx("ds-c-checkbox__icon", iconClassNameProp);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <ControlLabel
            {...labelProps}
            disabled={disabled}
            hasError={hasError}
            id={id}
            label={label}
            className={className}
            labelPosition={labelPosition}
        >
            <div {...filterProps(otherProps)} className={containerClassName} disabled={disabled === true}>
                <input
                    {...filterProps(inputProps)}
                    checked={checked}
                    className={inputClassName}
                    disabled={disabled}
                    id={id ?? name}
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
                    {indeterminate && <div className="ds-c-checkbox__indeterminate" />}
                </div>
            </div>
        </ControlLabel>
    );
}

export const CheckboxField = FieldHoc(Checkbox, "Checkbox");
