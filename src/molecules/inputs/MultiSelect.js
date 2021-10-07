// Libs
import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { patchFormEventValue, filterProps } from "../../core/utils";

// Components
import { ChipAction, ChipContainer } from "../displays";
import { List, ListItem } from "../lists";
import { Dropdown } from "../modals";
import { FieldHoc } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";

function _getLabel(options, value) {
    if (!options?.length) {
        return null;
    }

    return options.find((opt) => opt.value === value)?.label;
}

/**
 * MultiSelectField allows users to select multiple values from a list of options.
 *
 * ```js
 * import { MultiSelectField } from "./components/molecules/inputs"
 * ```
 *
 * ℹ️ `MultiSelectField`'s props are the join of props from `MultiSelect` and `Field`
 *
 * Or bare version:
 *
 * ```js
 * import { MultiSelect } from "./components/molecules/inputs"
 * ```
 */
export function MultiSelect({
    chipClassName: chipClassNameProp,
    chipContainerClassName: chipContainerClassNameProp,
    chipContainerProps,
    chipProps,
    className,
    disabled = false,
    dropdownClassName: dropdownClassNameProp,
    dropdownProps,
    hasError,
    icon = "enter",
    iconFocus = "close",
    id,
    inputClassName: inputClassNameProp,
    inputProps,
    listClassName: listClassNameProp,
    listItemClassName: listItemClassNameProp,
    listItemProps,
    listProps,
    name,
    onChange,
    onClick,
    onBlur,
    onFocus,
    options: optionsProp,
    required = false,
    selectClassName: selectClassNameProp,
    selectProps,
    showChips = true,
    value,
    ...otherProps
}) {
    const multiClassName = classnames("thc-c-multi-select", className);
    const chipClassName = classnames("thc-c-multi-select__chip", chipClassNameProp);
    const chipContainerClassName = classnames("thc-c-multi-select__chip-container", chipContainerClassNameProp);
    const dropdownClassName = classnames("thc-c-multi-select__dropdown", dropdownClassNameProp);
    const inputClassName = classnames("thc-c-multi-select__input", inputClassNameProp);
    const listClassName = classnames("thc-c-multi-select__list", listClassNameProp);
    const listItemClassName = classnames("thc-c-multi-select__list-item", listItemClassNameProp);
    const selectClassName = classnames("thc-c-multi-select__select", selectClassNameProp);

    const selectRef = useRef();

    const _handleChange = useCallback(
        (event) => {
            if (onChange) {
                const newEvent = patchFormEventValue(event, event.target, [...value, event.target.value]);

                onChange(newEvent);
            }
        },
        [onChange, value]
    );

    const _handleRemoveValue = useCallback(
        (event, optionVal) => {
            const newEvent = patchFormEventValue(
                event,
                selectRef.current,
                value.filter((v) => v !== optionVal)
            );

            if (required && newEvent.target.value.length === 0) {
                return;
            }

            if (onChange) {
                onChange(newEvent);
            }
        },
        [onChange, required, value]
    );

    const options = useMemo(() => {
        return optionsProp?.filter((opt) => !value?.includes(opt.value));
    }, [optionsProp, value]);

    return (
        <div {...filterProps(otherProps)} className={multiClassName} disabled={disabled === true}>
            <Select
                {...selectProps}
                className={selectClassName}
                disabled={disabled}
                dropdownClassName={dropdownClassName}
                dropdownProps={dropdownProps}
                hasError={hasError}
                icon={icon}
                iconFocus={iconFocus}
                id={id}
                inputClassName={inputClassName}
                inputProps={inputProps}
                listClassName={listClassName}
                listItemClassName={listItemClassName}
                listItemProps={listItemProps}
                listProps={listProps}
                name={name}
                onChange={_handleChange}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                options={options}
                ref={selectRef}
                required
            />
            {showChips && (
                <ChipContainer {...chipContainerProps} className={chipContainerClassName}>
                    {value?.map((val) => (
                        <ChipAction
                            key={val}
                            {...chipProps}
                            className={chipClassName}
                            disabled={disabled}
                            label={_getLabel(optionsProp, val)}
                            onClick={(event) => _handleRemoveValue(event, val)}
                        />
                    ))}
                </ChipContainer>
            )}
        </div>
    );
}

MultiSelect.propTypes = {
    /**
     * Additional className for chip
     */
    chipClassName: PropTypes.string,
    /**
     * Additional className for chip container
     */
    chipContainerClassName: PropTypes.string,
    /**
     * Additional props for chip container
     */
    chipContainerProps: PropTypes.shape(ChipContainer.propTypes),
    /**
     * Additional props for chip
     */
    chipProps: PropTypes.shape(ChipAction.propTypes),
    /**
     * Additional className for multi select
     */
    className: PropTypes.string,
    /**
     * If disabled
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
     * If has error
     */
    hasError: PropTypes.bool,
    /**
     * Icon
     */
    icon: PropTypes.string,
    /**
     * Icon if focused
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
     * Options
     */
    options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
    /**
     * If required
     */
    required: PropTypes.bool,
    /**
     * Additional className for select
     */
    selectClassName: PropTypes.string,
    /**
     * Additional props for select
     */
    selectProps: PropTypes.shape(Select.propTypes),
    /**
     * If chips are visible
     */
    showChips: PropTypes.bool,
    /**
     * Value
     */
    value: PropTypes.arrayOf(PropTypes.any),
};

export const MultiSelectField = FieldHoc(MultiSelect, "MultiSelect");
