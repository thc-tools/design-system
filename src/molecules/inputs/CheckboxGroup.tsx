// Libs
import classnames from "classnames";
import React, { useCallback, useRef } from "react";

// Utils
import { useTranslation } from "../../core";
import { filterProps, patchFormEventValue } from "../../core/utils";

// Components
import { Checkbox, CheckboxProps } from "./Checkbox";
import { FieldHoc } from "./Field";
import { FieldOption } from "./_utils";

export const CHECKBOX_GROUP_TRANSLATION_KEY = "thc.inputs.checkbox-group";

export interface CheckboxGroupProps {
    /**
     * Additional props for checkbox
     */
    checkboxProps?: CheckboxProps;
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
     * If has selectAll
     */
    hasSelectAll?: boolean;
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
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Options
     */
    options: FieldOption[];
    /**
     * Select all label
     */
    selectAllLabel?: string;
    /**
     * Additional props for selectAll
     */
    selectAllProps?: CheckboxProps;
    /**
     * Custom translation key
     */
    translationKey?: string;
    /**
     * Value
     */
    value: (string | number | undefined)[];
    /**
     * If is in formik
     */
    withFormik?: boolean;
}

export function CheckboxGroup({
    checkboxProps,
    className,
    disabled = false,
    hasError,
    hasSelectAll = false,
    id,
    name,
    onChange,
    options = [],
    selectAllLabel = "select-all",
    selectAllProps,
    translationKey = CHECKBOX_GROUP_TRANSLATION_KEY,
    value = [],
    withFormik = false,
    ...otherProps
}: CheckboxGroupProps) {
    const rootClassName = classnames("thc-c-checkbox-group", className);

    const { translate } = useTranslation(translationKey);

    const selectAllChecked = value.length > 0 && value.length === options.length;
    const selectAllIndeterminate = value.length > 0 && value.length < options.length;

    const inputRef = useRef(null);

    const handleChange = useCallback(
        (event) => {
            if (onChange) {
                const checkboxValue = event.target.value;
                const newValue = value.includes(checkboxValue)
                    ? value.filter((v) => v !== checkboxValue)
                    : [...value, checkboxValue];
                const newEvent = patchFormEventValue(event, withFormik ? inputRef.current : event.target, newValue);

                onChange(newEvent);
            }
        },
        [onChange, value, withFormik]
    );

    const handleSelectAllChange = useCallback(
        (event) => {
            if (onChange) {
                const newValue = selectAllChecked ? [] : options.map((opt) => opt.value);
                const newEvent = patchFormEventValue(event, withFormik ? inputRef.current : event.target, newValue);

                onChange(newEvent);
            }
        },
        [selectAllChecked, onChange, options, withFormik]
    );

    return (
        <div {...filterProps(otherProps)} className={rootClassName} disabled={disabled === true}>
            {/* Is needed because of Formik wanted to handle checkbox values ! */}
            <input hidden id={`${id}-input`} name={name} type="text" ref={inputRef} />
            {hasSelectAll && (
                <>
                    <Checkbox
                        {...selectAllProps}
                        checked={selectAllChecked}
                        disabled={disabled}
                        hasError={hasError}
                        id={`${id}-select-all`}
                        indeterminate={selectAllIndeterminate}
                        label={translate(selectAllLabel)}
                        name={name}
                        onChange={handleSelectAllChange}
                        value={undefined}
                    />
                    <hr />
                </>
            )}
            {options.map(({ value: optionValue, disabled: optionDisabled, ...otherOptionProps }) => (
                <Checkbox
                    key={optionValue}
                    {...checkboxProps}
                    {...otherOptionProps}
                    checked={value.includes(optionValue)}
                    disabled={optionDisabled || disabled}
                    hasError={hasError}
                    id={`${id}-${optionValue}`}
                    name={name}
                    onChange={handleChange}
                    value={optionValue}
                />
            ))}
        </div>
    );
}

export const CheckboxGroupField = FieldHoc(CheckboxGroup, "CheckboxGroup");
