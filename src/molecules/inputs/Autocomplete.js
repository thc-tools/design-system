// Libs
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { isEmpty } from "lodash";

// Utils
import { useForkRef } from "../../core/hooks";
import { patchFormEventValue, filterProps } from "../../core/utils";

// Components
import { useTranslation } from "../../core";
import { List, ListItem, ListItemText } from "../lists";
import { Dropdown } from "../modals";
import { FieldHoc } from "./Field";
import { Input } from "./Input";
import { InputAdornment } from "./InputAdornment";

const DEFAULT_OPTIONS_STATE = { options: [], totalCount: 0 };

export const AUTOCOMPLETE_TRANSLATION_KEY = "thc.inputs.autocomplete";

export const Autocomplete = React.forwardRef(function Autocomplete(
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
        moreResultLabel = "more-result",
        name,
        noOptionsLabel = "no-option",
        placeholder,
        onChange,
        onClick,
        onBlur,
        onFocus,
        querySearcher,
        required = false,
        translationKey = AUTOCOMPLETE_TRANSLATION_KEY,
        value: valueProp,
        ...otherProps
    },
    ref
) {
    const { translate } = useTranslation(translationKey);

    const rootClassName = classnames("thc-c-autocomplete", className);

    const inputClassName = classnames("thc-c-autocomplete__input", inputClassNameProp);
    const dropdownClassName = classnames(
        "thc-c-autocomplete__dropdown",
        dropdownClassNameProp,
        dropdownProps?.className
    );
    const listClassName = classnames("thc-c-autocomplete__list", listClassNameProp);
    const listItemClassName = classnames("thc-c-autocomplete__list-item", listItemClassNameProp);

    const inputRef = useRef(null);
    const forkedRef = useForkRef(inputRef, ref);

    const [open, setOpen] = useState(false);
    const [optionsState, setOptionsState] = useState(DEFAULT_OPTIONS_STATE);
    const [searchValue, setSearchValue] = useState("");
    const [value, setValue] = useState("");

    const handleClearAutocomplete = useCallback(
        (event) => {
            // If we begin to tap again we reset previously selected option
            if (valueProp !== "" && valueProp !== undefined) {
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
        if (valueProp) {
            labelResolver({ value: valueProp }).then((newValue) => setValue(newValue));
        } else {
            setValue("");
        }
    }, [valueProp, labelResolver, setValue]);

    const endAdornment = useMemo(
        () => [
            <InputAdornment className="thc-c-select__icon" onClick={valueProp ? handleClearAutocomplete : undefined}>
                {valueProp ? iconClear : icon}
            </InputAdornment>,
            ...(Array.isArray(inputProps?.endAdornment)
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
                anchorEl={inputRef}
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
                                        <span className="thc-u-status--error">{error}</span>
                                    ) : warning ? (
                                        <span className="thc-u-status--warning">{warning}</span>
                                    ) : undefined
                                }
                            />
                        </ListItem>
                    ))}
                    {(optionsState.options?.length ?? 0) < (optionsState.totalCount ?? 0) && (
                        <ListItem className="thc-u-text--secondary" condensed>
                            {translate(moreResultLabel)}
                        </ListItem>
                    )}
                    {!optionsState.options?.length && <ListItem condensed>{translate(noOptionsLabel)}</ListItem>}
                </List>
            </Dropdown>
        </div>
    );
});

Autocomplete.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Additional className for Dropdown
     */
    dropdownClassName: PropTypes.string,
    /**
     * Additional props for Dropdown
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
     * Clear icon
     */
    iconClear: PropTypes.string,
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Additional className for Input
     */
    inputClassName: PropTypes.string,
    /**
     * Additional props for Input
     */
    inputProps: PropTypes.shape(Input.propTypes),
    /**
     * Resolver for labels
     */
    labelResolver: PropTypes.func,
    /**
     * Additional className for List
     */
    listClassName: PropTypes.string,
    /**
     * Additional className for ListItem
     */
    listItemClassName: PropTypes.string,
    /**
     * Additional props for ListItem
     */
    listItemProps: PropTypes.shape(ListItem.propTypes),
    /**
     * Additional props for List
     */
    listProps: PropTypes.shape(List.propTypes),
    /**
     * More result label key
     */
    moreResultLabel: PropTypes.string,
    /**
     * Name
     */
    name: PropTypes.string,
    /**
     * No options label
     */
    noOptionsLabel: PropTypes.string,
    /**
     * Placeholder
     */
    placeholder: PropTypes.string,
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
     * Query searcher
     */
    querySearcher: PropTypes.func,
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
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

export const AutocompleteField = FieldHoc(Autocomplete, "Autocomplete");
