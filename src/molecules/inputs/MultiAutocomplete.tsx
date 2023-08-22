// Libs
import classnames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Utils
import { filterProps, patchFormEventValue } from "../../core/utils";

// Components
import { ChipAction, ChipActionProps, ChipContainer, ChipContainerProps } from "../displays";
import { Icons } from "../icons";
import { ListItemProps, ListProps } from "../lists";
import { DropdownProps } from "../modals";
import { Autocomplete, AutocompleteProps } from "./Autocomplete";
import { FieldHoc } from "./Field";
import { InputProps } from "./Input";
import { FieldOption, getLabelFromOptions } from "./_utils";

export interface MultiAutocompleteProps {
    /**
     * Additional className for Autocomplete
     */
    autocompleteClassName?: string;
    /**
     * Additional props for Autocomplete
     */
    autocompleteProps?: AutocompleteProps;
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
     * Labels resolver
     */
    labelsResolver: (values: (number | string | undefined)[]) => Promise<FieldOption[]>;
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
     * Query searcher
     */
    querySearcher: AutocompleteProps["querySearcher"];
    /**
     * If required
     */
    required?: boolean;
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
export function MultiAutocomplete({
    autocompleteClassName: autocompleteClassNameProp,
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
    labelsResolver,
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
}: MultiAutocompleteProps) {
    const multiClassName = classnames("thc-c-multi-autocomplete", className);
    const chipClassName = classnames("thc-c-multi-autocomplete__chip", chipClassNameProp);
    const chipContainerClassName = classnames("thc-c-multi-autocomplete__chip-container", chipContainerClassNameProp);
    const dropdownClassName = classnames("thc-c-multi-autocomplete__dropdown", dropdownClassNameProp);
    const inputClassName = classnames("thc-c-multi-autocomplete__input", inputClassNameProp);
    const listClassName = classnames("thc-c-multi-autocomplete__list", listClassNameProp);
    const listItemClassName = classnames("thc-c-multi-autocomplete__list-item", listItemClassNameProp);
    const autocompleteClassName = classnames("thc-c-multi-autocomplete__autocomplete", autocompleteClassNameProp);

    const autocompleteRef = useRef<HTMLInputElement>(null);

    const [labels, setLabels] = useState<FieldOption[]>([]);

    useEffect(() => {
        if (value && value?.length > 0) {
            labelsResolver(value).then(setLabels);
        } else {
            setLabels([]);
        }
    }, [value, labelsResolver, setLabels]);

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
        (query: { filter: string }) => {
            return querySearcher(query).then(({ options }) => {
                const filtered = options.filter((opt) => !value.includes(opt.value));
                return { options: filtered, totalCount: filtered.length };
            });
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
                            label={getLabelFromOptions(labels, val) ?? ""}
                            onClick={(event) => _handleRemoveValue(event, val)}
                        />
                    ))}
                </ChipContainer>
            )}
        </div>
    );
}

export const MultiAutocompleteField = FieldHoc(MultiAutocomplete, "MultiAutocomplete");
