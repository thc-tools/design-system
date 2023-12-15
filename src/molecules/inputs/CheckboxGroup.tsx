// Libs
import clsx from "clsx";
import React, { useCallback, useRef } from "react";

// Utils
import { DESIGN_SYSTEM_INPUTS_TK, DESIGN_SYSTEM_TRANSLATION_NAMESPACE, useTranslation } from "../../core";
import { filterProps, patchFormEventValue } from "../../core/utils";

// Components
import { Checkbox, CheckboxProps } from "./Checkbox";
import { FieldHoc } from "./Field";
import { FieldOption, guessOptionType } from "./_utils";

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
    selectAllLabel = "checkbox-group.select-all",
    selectAllProps,
    translationKey = `${DESIGN_SYSTEM_TRANSLATION_NAMESPACE}:${DESIGN_SYSTEM_INPUTS_TK}`,
    value = [],
    withFormik = false,
    ...otherProps
}: CheckboxGroupProps): JSX.Element {
    const rootClassName = clsx("ds-c-checkbox-group", className);

    const { t } = useTranslation(translationKey);

    const selectAllChecked = value.length > 0 && value.length === options.length;
    const selectAllIndeterminate = value.length > 0 && value.length < options.length;

    const inputRef = useRef(null);

    const handleChange = useCallback(
        (event) => {
            if (onChange) {
                let checkboxValue = event.target.value;
                if (guessOptionType(options, checkboxValue) === "number") {
                    checkboxValue = Number.parseInt(checkboxValue, 10);
                }
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
                        label={t(selectAllLabel)}
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
                    id={`${id ?? name}-${optionValue}`}
                    name={name}
                    onChange={handleChange}
                    value={optionValue}
                />
            ))}
        </div>
    );
}

export const CheckboxGroupField = FieldHoc(CheckboxGroup, "CheckboxGroup");
