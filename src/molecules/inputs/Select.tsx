// Libs
import clsx from "clsx";
import { isEmpty } from "lodash";
import React, { useCallback, useMemo, useRef } from "react";

// Utils
import { useFocus, useForkRef } from "../../core/hooks";
import { filterProps, patchFormEventValue } from "../../core/utils";

// Components
import { FieldLabelProps } from "src/design-system/molecules/inputs/FieldLabel";
import { DESIGN_SYSTEM_INPUTS_TK, DESIGN_SYSTEM_TRANSLATION_NAMESPACE, useTranslation } from "../../core";
import { Icons } from "../icons";
import { List, ListItem, ListItemProps, ListItemText, ListProps } from "../lists";
import { Dropdown, DropdownProps } from "../modals";
import { FieldHoc } from "./Field";
import { Input, InputProps } from "./Input";
import { InputAdornment } from "./InputAdornment";
import { FieldOption } from "./_utils";

export const SELECT_TRANSLATION_KEY = "ds.inputs.select";

export interface SelectProps {
    /**
     * Additional className for select
     */
    className?: string;
    /**
     * If is disabled
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
     * If has background
     */
    hasBackground?: boolean;
    /**
     * If has an error
     */
    hasError?: boolean;
    /**
     * If has full width
     */
    hasFullWidth?: boolean;
    /**
     * Icon to display
     */
    icon?: Icons;
    /**
     * Icon to display when focused
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
    inputProps?: Partial<InputProps>;
    /**
     * Label
     */
    label?: string;
    /**
     * Additional label className
     */
    labelClassName?: string;
    /**
     * Additional label props
     */
    labelProps?: FieldLabelProps;
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
     * Label if no options is given
     */
    noOptionsLabel?: string;
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
     * Placeholder
     */
    placeholder?: string;
    /**
     * If is required
     */
    required?: boolean;
    /**
     * Translation key
     */
    translationKey?: string;
    /**
     * Value
     */
    value?: number | string | undefined;
}

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
export const Select = React.forwardRef<HTMLInputElement, SelectProps>(function Select(
    {
        className,
        disabled = false,
        dropdownClassName: dropdownClassNameProp,
        dropdownProps,
        hasBackground = true,
        hasError = false,
        hasFullWidth = false,
        icon = "drop",
        iconFocus = "drop",
        id,
        inputClassName: inputClassNameProp,
        inputProps,
        label,
        labelClassName,
        labelProps,
        listClassName: listClassNameProp,
        listItemClassName: listItemClassNameProp,
        listItemProps,
        listProps,
        name,
        noOptionsLabel = "select.no-option",
        placeholder,
        onChange,
        onClick,
        onBlur,
        onFocus,
        options: optionsProp,
        required = false,
        translationKey = `${DESIGN_SYSTEM_TRANSLATION_NAMESPACE}:${DESIGN_SYSTEM_INPUTS_TK}`,
        value: valueProp,
        ...otherProps
    },
    ref
) {
    const { t } = useTranslation(translationKey);

    const selectClassName = clsx("ds-c-select", className);
    const inputClassName = clsx("ds-c-select__input", inputClassNameProp);
    const dropdownClassName = clsx("ds-c-select__dropdown", dropdownClassNameProp, dropdownProps?.className);
    const listClassName = clsx("ds-c-select__list", listClassNameProp);
    const listItemClassName = clsx("ds-c-select__list-item", listItemClassNameProp);

    const inputContainerRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const forkedRef = useForkRef(inputRef, ref);

    const { focus: open, setFocus: setOpen, _handleFocus } = useFocus(disabled, onFocus);

    const _handleChange = useCallback(
        (event: React.MouseEvent<HTMLDivElement>, value: string | number | undefined) => {
            if (onChange) {
                const newEvent = patchFormEventValue(
                    event,
                    inputRef.current ?? (event.target as HTMLInputElement),
                    value
                );

                onChange(newEvent as unknown as React.ChangeEvent<HTMLInputElement>);
            }

            setOpen(false);
        },
        [onChange, setOpen]
    );

    const options = useMemo(() => {
        if (required || !optionsProp?.length || optionsProp?.find((o) => o.value === undefined)) {
            return optionsProp;
        }
        return [{ label: undefined, value: undefined } as FieldOption, ...optionsProp];
    }, [optionsProp, required]);

    const value = useMemo(() => {
        if (!options?.length) {
            return "";
        }

        return options.find((opt) => opt.value === valueProp)?.label ?? "";
    }, [valueProp, options]);

    const endAdornment = useMemo(
        () => [
            <InputAdornment className="ds-c-select__icon" key="focus">
                {open ? iconFocus : icon}
            </InputAdornment>,
            ...(inputProps && Array.isArray(inputProps.endAdornment)
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
                containerRef={inputContainerRef}
                disabled={disabled}
                endAdornment={endAdornment}
                hasBackground={hasBackground}
                hasError={hasError}
                hasFullWidth={hasFullWidth}
                id={id}
                name={name}
                label={label}
                labelClassName={labelClassName}
                labelProps={labelProps}
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
                    vertical: "bottom",
                    horizontal: "left",
                }}
                {...dropdownProps}
                anchorEl={inputContainerRef}
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
                                        <span className="ds-u-status--error">{error}</span>
                                    ) : warning ? (
                                        <span className="ds-u-status--warning">{warning}</span>
                                    ) : undefined
                                }
                            />
                        </ListItem>
                    ))}
                    {!options?.length && <ListItem condensed>{t(noOptionsLabel)}</ListItem>}
                </List>
            </Dropdown>
        </div>
    );
});

export const SelectField = FieldHoc<SelectProps>(Select, "Select", { innerLabel: true });
