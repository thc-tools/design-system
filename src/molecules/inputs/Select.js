// Libs
import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { isEmpty } from "lodash";

// Utils
import { useForkRef, useFocus } from "../../core/hooks";
import { patchFormEventValue, filterProps } from "../../core/utils";

// Components
import { useTranslation } from "../../core";
import { List, ListItem, ListItemText } from "../lists";
import { Dropdown } from "../modals";
import { FieldHoc } from "./Field";
import { Input } from "./Input";
import { InputAdornment } from "./InputAdornment";

export const SELECT_TRANSLATION_KEY = "thc.inputs.select";

/**
 * SelectField allows users to select a value from a list of options.
 *
 * ```js
 * import { SelectField } from "./components/molecules/inputs"
 * ```
 *
 * ℹ️ `SelectField`'s props are the join of props from `Select` and `Field`
 *
 * Or bare version:
 *
 * ```js
 * import { Select } from "./components/molecules/inputs"
 * ```
 */
export const Select = React.forwardRef(function Select(
    {
        className,
        disabled = false,
        dropdownClassName: dropdownClassNameProp,
        dropdownProps,
        hasError = false,
        icon = "angle-down",
        iconFocus = "angle-up",
        id,
        inputClassName: inputClassNameProp,
        inputProps,
        listClassName: listClassNameProp,
        listItemClassName: listItemClassNameProp,
        listItemProps,
        listProps,
        name,
        noOptionsLabel = "no-option",
        placeholder,
        onChange,
        onClick,
        onBlur,
        onFocus,
        options: optionsProp,
        required = false,
        translationKey = SELECT_TRANSLATION_KEY,
        value: valueProp,
        ...otherProps
    },
    ref
) {
    const { translate } = useTranslation(translationKey);

    const selectClassName = classnames("thc-c-select", className);
    const inputClassName = classnames("thc-c-select__input", inputClassNameProp);
    const dropdownClassName = classnames("thc-c-select__dropdown", dropdownClassNameProp, dropdownProps?.className);
    const listClassName = classnames("thc-c-select__list", listClassNameProp);
    const listItemClassName = classnames("thc-c-select__list-item", listItemClassNameProp);

    const inputRef = useRef(null);
    const forkedRef = useForkRef(inputRef, ref);

    const { focus: open, setFocus: setOpen, _handleFocus } = useFocus(disabled, onFocus);

    const _handleChange = useCallback(
        (event, value) => {
            if (onChange) {
                const newEvent = patchFormEventValue(event, inputRef.current, value);

                onChange(newEvent);
            }

            setOpen(false);
        },
        [onChange, setOpen]
    );

    const options = useMemo(() => {
        if (required || !optionsProp?.length || optionsProp?.find((o) => o.value === undefined)) {
            return optionsProp;
        }
        return [{ label: undefined, value: undefined }, ...optionsProp];
    }, [optionsProp, required]);

    const value = useMemo(() => {
        if (!options?.length) {
            return "";
        }

        return options.find((opt) => opt.value === valueProp)?.label ?? "";
    }, [valueProp, options]);

    const endAdornment = useMemo(
        () => [
            <InputAdornment className="thc-c-select__icon">{open ? iconFocus : icon}</InputAdornment>,
            ...(Array.isArray(inputProps?.endAdornment)
                ? inputProps.endAdornment
                : [inputProps?.endAdornment].filter(Boolean)),
        ],
        [icon, iconFocus, inputProps, open]
    );
    return (
        <div {...filterProps(otherProps)} className={selectClassName}>
            <Input
                {...inputProps}
                className={inputClassName}
                disabled={disabled}
                endAdornment={endAdornment}
                hasError={hasError}
                id={id}
                name={name}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={_handleFocus}
                placeholder={placeholder}
                readOnly
                ref={forkedRef}
                required={required}
                type="text"
                value={value}
            />
            <Dropdown
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                {...dropdownProps}
                anchorEl={inputRef}
                className={dropdownClassName}
                open={open}
                onClose={() => setOpen(false)}
            >
                <List {...listProps} className={listClassName}>
                    {options?.map(({ disabled = false, error, label, value, warning }) => (
                        <ListItem
                            {...listItemProps}
                            className={listItemClassName}
                            condensed
                            disabled={disabled}
                            key={value ?? "empty"}
                            onClick={(event) => _handleChange(event, value)}
                        >
                            <ListItemText
                                primary={!isEmpty(label) ? label : <span>&nbsp;</span>}
                                secondary={
                                    error ? (
                                        <span className="thc-u-status--error">{error}</span>
                                    ) : warning ? (
                                        <span className="thc-u-status--warning">{warning}</span>
                                    ) : undefined
                                }
                            />
                        </ListItem>
                    ))}
                    {!options?.length && <ListItem condensed>{translate(noOptionsLabel)}</ListItem>}
                </List>
            </Dropdown>
        </div>
    );
});

Select.propTypes = {
    /**
     * Additional className for select
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Additional className for dropdown
     */
    dropdownClassName: PropTypes.string,
    /**
     * Additional props for dropdown
     */
    dropdownProps: PropTypes.shape(Dropdown.propTypes),
    /**
     * If has an error
     */
    hasError: PropTypes.bool,
    /**
     * Icon to display
     */
    icon: PropTypes.string,
    /**
     * Icon to display when focused
     */
    iconFocus: PropTypes.string,
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
    inputProps: PropTypes.shape(Input.propTypes),
    /**
     * Additional className for list
     */
    listClassName: PropTypes.string,
    /**
     * Additional className for list item
     */
    listItemClassName: PropTypes.string,
    /**
     * Additional props for list item
     */
    listItemProps: PropTypes.shape(ListItem.propTypes),
    /**
     * Additional props for list
     */
    listProps: PropTypes.shape(List.propTypes),
    /**
     * Name
     */
    name: PropTypes.string,
    /**
     * Label if no options is given
     */
    noOptionsLabel: PropTypes.string,
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
     * Options for select
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * If has error
             */
            error: PropTypes.string,
            /**
             * Option label
             */
            label: PropTypes.string,
            /**
             * Option value
             */
            value: PropTypes.string,
            /**
             * If has warning
             */
            warning: PropTypes.string,
        })
    ),
    /**
     * Placeholder
     */
    placeholder: PropTypes.string,
    /**
     * If is required
     */
    required: PropTypes.bool,
    /**
     * Translation key
     */
    translationKey: PropTypes.string,
    /**
     * Value
     */
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

export const SelectField = FieldHoc(Select, "Select");
