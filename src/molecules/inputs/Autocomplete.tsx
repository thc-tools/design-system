// Libs
import clsx from "clsx";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Utils
import { useForkRef } from "../../core/hooks";
import { filterProps, patchFormEventValue } from "../../core/utils";

// Components
import { DESIGN_SYSTEM_INPUTS_TK, DESIGN_SYSTEM_TRANSLATION_NAMESPACE, useTranslation } from "../../core";
import { Icons } from "../icons";
import { List, ListItem, ListItemProps, ListItemText, ListProps } from "../lists";
import { Dropdown, DropdownProps } from "../modals";
import { FieldHoc } from "./Field";
import { Input, InputProps } from "./Input";
import { InputAdornment } from "./InputAdornment";
import { FieldOption } from "./_utils";

interface AutocompleteOptionState {
    options: FieldOption[];
    totalCount: number;
}

const DEFAULT_OPTIONS_STATE: AutocompleteOptionState = { options: [], totalCount: 0 };

export interface AutocompleteProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Additional className for Dropdown
     */
    dropdownClassName?: string;
    /**
     * Additional props for Dropdown
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
     * Clear icon
     */
    iconClear?: Icons;
    /**
     * Identifier
     */
    id?: string;
    /**
     * Additional className for Input
     */
    inputClassName?: string;
    /**
     * Additional props for Input
     */
    inputProps?: InputProps;
    /**
     * Resolver for labels
     */
    labelResolver?: (value: number | string | undefined) => Promise<FieldOption>;
    /**
     * Additional className for List
     */
    listClassName?: string;
    /**
     * Additional className for ListItem
     */
    listItemClassName?: string;
    /**
     * Additional props for ListItem
     */
    listItemProps?: ListItemProps;
    /**
     * Additional props for List
     */
    listProps?: ListProps;
    /**
     * More result label key
     */
    moreResultLabel?: string;
    /**
     * Name
     */
    name: string;
    /**
     * No options label
     */
    noOptionsLabel?: string;
    /**
     * Placeholder
     */
    placeholder?: string;
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
     * Query searcher
     */
    querySearcher: (query: { filter: string }) => Promise<AutocompleteOptionState>;
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

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(function Autocomplete(
    {
        className,
        disabled = false,
        dropdownClassName: dropdownClassNameProp,
        dropdownProps,
        hasError = false,
        icon = "enter",
        iconClear = "close",
        id,
        inputClassName: inputClassNameProp,
        inputProps,
        labelResolver,
        listClassName: listClassNameProp,
        listItemClassName: listItemClassNameProp,
        listItemProps,
        listProps,
        moreResultLabel = "autocomplete.more-result",
        name,
        noOptionsLabel = "autocomplete.no-option",
        placeholder,
        onChange,
        onClick,
        onBlur,
        onFocus,
        querySearcher,
        required = false,
        translationKey = `${DESIGN_SYSTEM_TRANSLATION_NAMESPACE}:${DESIGN_SYSTEM_INPUTS_TK}`,
        value: valueProp,
        ...otherProps
    },
    ref
) {
    const { t } = useTranslation(translationKey);

    const rootClassName = clsx("ds-c-autocomplete", className);

    const inputClassName = clsx("ds-c-autocomplete__input", inputClassNameProp);
    const dropdownClassName = clsx("ds-c-autocomplete__dropdown", dropdownClassNameProp, dropdownProps?.className);
    const listClassName = clsx("ds-c-autocomplete__list", listClassNameProp);
    const listItemClassName = clsx("ds-c-autocomplete__list-item", listItemClassNameProp);

    const inputRef = useRef(null);
    const inputContainerRef = useRef(null);
    const forkedRef = useForkRef(inputRef, ref);

    const [open, setOpen] = useState(false);
    const [optionsState, setOptionsState] = useState<AutocompleteOptionState>(DEFAULT_OPTIONS_STATE);
    const [searchValue, setSearchValue] = useState("");
    const [value, setValue] = useState("");

    const handleClearAutocomplete = useCallback(
        (event) => {
            // If we begin to tap again we reset previously selected option
            if (valueProp !== undefined && valueProp !== "") {
                const newEvent = patchFormEventValue(event, inputRef.current, undefined);

                setSearchValue("");
                onChange(newEvent);
            }
        },
        [valueProp, onChange]
    );

    const handleInputChange = useCallback(
        (event) => {
            const newSearchValue = event.target.value;

            handleClearAutocomplete(event);
            setSearchValue(newSearchValue);

            if (newSearchValue) {
                querySearcher({ filter: newSearchValue }).then((newOptionsState) => {
                    setOptionsState(newOptionsState);

                    if (!open) {
                        setOpen(true);
                    }
                });
            } else {
                setOptionsState(DEFAULT_OPTIONS_STATE);
                setOpen(false);
            }
        },
        [querySearcher, handleClearAutocomplete, open, setOptionsState, setOpen]
    );

    const handleOptionSelect = useCallback(
        (event, optionValue) => {
            const newEvent = patchFormEventValue(event, inputRef.current, optionValue);

            setOpen(false);
            onChange(newEvent);
        },
        [onChange]
    );

    useEffect(() => {
        if (valueProp && labelResolver) {
            labelResolver(valueProp).then((newValue) => setValue(newValue.label ?? ""));
        } else {
            setValue("");
        }
    }, [valueProp, labelResolver, setValue]);

    const endAdornment = useMemo(
        () => [
            <InputAdornment
                className="ds-c-select__icon"
                onClick={valueProp ? handleClearAutocomplete : undefined}
                key="autocomplete-action"
            >
                {valueProp ? iconClear : icon}
            </InputAdornment>,
            ...(inputProps && Array.isArray(inputProps.endAdornment)
                ? inputProps.endAdornment
                : [inputProps?.endAdornment].filter(Boolean)),
        ],
        [icon, iconClear, inputProps, valueProp, handleClearAutocomplete]
    );

    return (
        <div {...filterProps(otherProps)} className={rootClassName}>
            <Input
                {...inputProps}
                className={inputClassName}
                containerRef={inputContainerRef}
                disabled={disabled}
                endAdornment={endAdornment}
                hasError={hasError}
                id={id}
                name={name}
                onBlur={onBlur}
                onChange={handleInputChange}
                onClick={onClick}
                onFocus={onFocus}
                placeholder={placeholder}
                ref={forkedRef}
                required={required}
                type="text"
                value={value || searchValue}
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
                    {optionsState.options?.map(({ error, label, value, warning }) => (
                        <ListItem
                            {...listItemProps}
                            className={listItemClassName}
                            condensed
                            key={value}
                            onClick={(event) => handleOptionSelect(event, value)}
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
                    {(optionsState.options?.length ?? 0) < (optionsState.totalCount ?? 0) && (
                        <ListItem className="ds-u-text--secondary" condensed>
                            {t(moreResultLabel)}
                        </ListItem>
                    )}
                    {!optionsState.options?.length && <ListItem condensed>{t(noOptionsLabel)}</ListItem>}
                </List>
            </Dropdown>
        </div>
    );
});

export const AutocompleteField = FieldHoc(Autocomplete, "Autocomplete");
