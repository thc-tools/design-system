// Libs
import clsx from "clsx";
import React, { useCallback, useMemo, useRef } from "react";

// Utils
import { filterProps, patchFormEventValue } from "../../core/utils";

// Components
import { ChipAction, ChipActionProps, ChipContainer, ChipContainerProps } from "../displays";
import { Icons } from "../icons";
import { ListItemProps, ListProps } from "../lists";
import { DropdownProps } from "../modals";
import { FieldHoc } from "./Field";
import { InputProps } from "./Input";
import { Select, SelectProps } from "./Select";
import { FieldOption, getLabelFromOptions } from "./_utils";

export interface MultiSelectProps {
    /**
     * Additional className for chip
     */
    chipClassName?: string;
    /**
     * Additional className for chip container
     */
    chipContainerClassName?: string;
    /**
     * Additional props for chip container
     */
    chipContainerProps?: ChipContainerProps;
    /**
     * Additional props for chip
     */
    chipProps?: ChipActionProps;
    /**
     * Additional className for multi select
     */
    className?: string;
    /**
     * If disabled
     */
    disabled?: boolean;
    /**
     * Additional className for dropdown
     */
    dropdownClassName?: string;
    /**
     * Additional props for dropdown
     */
    dropdownProps?: DropdownProps;
    /**
     * If has error
     */
    hasError?: boolean;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Icon if focused
     */
    iconFocus?: Icons;
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
    inputProps?: InputProps;
    /**
     * Additional className for list
     */
    listClassName?: string;
    /**
     * Additional className for list item
     */
    listItemClassName?: string;
    /**
     * Additional props for list item
     */
    listItemProps?: ListItemProps;
    /**
     * Additional props for list
     */
    listProps?: ListProps;
    /**
     * Name
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
     * Options
     */
    options: FieldOption[];
    /**
     * If required
     */
    required?: boolean;
    /**
     * Additional className for select
     */
    selectClassName?: string;
    /**
     * Additional props for select
     */
    selectProps?: SelectProps;
    /**
     * If chips are visible
     */
    showChips?: boolean;
    /**
     * Value
     */
    value: (number | string | undefined)[];
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
}: MultiSelectProps) {
    const multiClassName = clsx("ds-c-multi-select", className);
    const chipClassName = clsx("ds-c-multi-select__chip", chipClassNameProp);
    const chipContainerClassName = clsx("ds-c-multi-select__chip-container", chipContainerClassNameProp);
    const dropdownClassName = clsx("ds-c-multi-select__dropdown", dropdownClassNameProp);
    const inputClassName = clsx("ds-c-multi-select__input", inputClassNameProp);
    const listClassName = clsx("ds-c-multi-select__list", listClassNameProp);
    const listItemClassName = clsx("ds-c-multi-select__list-item", listItemClassNameProp);
    const selectClassName = clsx("ds-c-multi-select__select", selectClassNameProp);

    const selectRef = useRef<HTMLInputElement>(null);

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
                            label={getLabelFromOptions(optionsProp, val) ?? ""}
                            onClick={(event) => _handleRemoveValue(event, val)}
                        />
                    ))}
                </ChipContainer>
            )}
        </div>
    );
}

export const MultiSelectField = FieldHoc(MultiSelect, "MultiSelect");
