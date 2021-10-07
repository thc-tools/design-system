// Libs
import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { patchFormEventValue, filterProps } from "../../core/utils";

// Components
import { ChipAction, ChipContainer } from "../displays";
import { List, ListItem } from "../lists";
import { Dropdown } from "../modals";
import { Autocomplete } from "./Autocomplete";
import { FieldHoc } from "./Field";
import { Input } from "./Input";

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
export function MultiAutocomplete({
    autocomplete: autocompleteClassNameProp,
    autocompleteProps,
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
    labelResolver,
    listClassName: listClassNameProp,
    listItemClassName: listItemClassNameProp,
    listItemProps,
    listProps,
    name,
    onChange,
    onClick,
    onBlur,
    onFocus,
    querySearcher,
    required = false,
    showChips = true,
    value,
    ...otherProps
}) {
    const multiClassName = classnames("thc-c-multi-autocomplete", className);
    const chipClassName = classnames("thc-c-multi-autocomplete__chip", chipClassNameProp);
    const chipContainerClassName = classnames("thc-c-multi-autocomplete__chip-container", chipContainerClassNameProp);
    const dropdownClassName = classnames("thc-c-multi-autocomplete__dropdown", dropdownClassNameProp);
    const inputClassName = classnames("thc-c-multi-autocomplete__input", inputClassNameProp);
    const listClassName = classnames("thc-c-multi-autocomplete__list", listClassNameProp);
    const listItemClassName = classnames("thc-c-multi-autocomplete__list-item", listItemClassNameProp);
    const autocompleteClassName = classnames("thc-c-multi-autocomplete__autocomplete", autocompleteClassNameProp);

    const autocompleteRef = useRef();

    const [labels, setLabels] = useState([]);

    useEffect(() => {
        if (value && value?.length > 0) {
            labelResolver({ values: value }).then(setLabels);
        } else {
            setLabels([]);
        }
    }, [value, labelResolver, setLabels]);

    const handleChange = useCallback(
        (event) => {
            if (onChange) {
                const newEvent = patchFormEventValue(event, event.target, [...value, event.target.value]);

                onChange(newEvent);
            }
        },
        [onChange, value]
    );

    const _handleRemoveValue = useCallback(
        (event, optionValue) => {
            const newEvent = patchFormEventValue(
                event,
                autocompleteRef.current,
                value.filter((v) => v !== optionValue)
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

    const customQuerySearcher = useCallback(
        (filter) => {
            return querySearcher(filter).then((options) => options.filter((opt) => !value.includes(opt.value)));
        },
        [querySearcher, value]
    );

    return (
        <div {...filterProps(otherProps)} className={multiClassName} disabled={disabled === true}>
            <Autocomplete
                {...autocompleteProps}
                className={autocompleteClassName}
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
                onChange={handleChange}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                querySearcher={customQuerySearcher}
                ref={autocompleteRef}
                required
            />
            {showChips && (
                <ChipContainer {...chipContainerProps} className={chipContainerClassName}>
                    {value?.map((val) => (
                        <ChipAction
                            {...chipProps}
                            key={val}
                            className={chipClassName}
                            label={_getLabel(labels, val)}
                            onClick={(event) => _handleRemoveValue(event, val)}
                        />
                    ))}
                </ChipContainer>
            )}
        </div>
    );
}

MultiAutocomplete.propTypes = {
    /**
     * Additional className for Autocomplete
     */
    autocompleteClassName: PropTypes.string,
    /**
     * Additional props for Autocomplete
     */
    autocompleteProps: PropTypes.shape(Autocomplete.propTypes),
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
     * Label resolver
     */
    labelResolver: PropTypes.func,
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
     * Query searcher
     */
    querySearcher: PropTypes.func,
    /**
     * If required
     */
    required: PropTypes.bool,
    /**
     * If chips are visible
     */
    showChips: PropTypes.bool,
    /**
     * Value
     */
    value: PropTypes.arrayOf(PropTypes.any),
};

export const MultiAutocompleteField = FieldHoc(MultiAutocomplete, "MultiAutocomplete");
