// Libs
import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { useTranslation } from "../../core";
import { filterProps, patchFormEventValue } from "../../core/utils";

// Components
import { FieldHoc } from "./Field";
import { Checkbox } from "./Checkbox";

export const CHECKBOX_GROUP_TRANSLATION_KEY = "thc.inputs.checkbox-group";

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
}) {
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

CheckboxGroup.propTypes = {
    /**
     * Additional props for checkbox
     */
    checkboxProps: PropTypes.shape(Checkbox.propTypes),
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
     * If has selectAll
     */
    hasSelectAll: PropTypes.bool,
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Name for input
     */
    name: PropTypes.string,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Options
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * If is disabled
             */
            disabled: Checkbox.propTypes.disabled,
            /**
             * Label for checkbox
             */
            label: Checkbox.propTypes.label,
            /**
             * Value
             */
            value: Checkbox.propTypes.value,
        })
    ),
    /**
     * Select all label
     */
    selectAllLabel: PropTypes.string,
    /**
     * Additional props for selectAll
     */
    selectAllProps: PropTypes.shape(Checkbox.propTypes),
    /**
     * Custom translation key
     */
    translationKey: PropTypes.string,
    /**
     * Value
     */
    value: Checkbox.propTypes.value,
    /**
     * If is in formik
     */
    withFormik: PropTypes.bool,
};

export const CheckboxGroupField = FieldHoc(CheckboxGroup, "CheckboxGroup");
