// Libs
import { useField } from "formik";
import React from "react";

// Components
import { SwitchProps } from "react-router-dom";
import {
    AutocompleteField,
    AutocompleteProps,
    FieldProps as BaseFieldProps,
    CheckboxField,
    CheckboxProps,
    DatePickerField,
    DatePickerProps,
    InputProps,
    MultiAutocompleteField,
    MultiAutocompleteProps,
    MultiSelectField,
    MultiSelectProps,
    RadioField,
    RadioGroupField,
    RadioGroupProps,
    RadioProps,
    SelectField,
    SelectProps,
    SwitchField,
    TextField,
} from "../../molecules/inputs";
import { FieldOption } from "../../molecules/inputs/_utils";

export type FieldTypes =
    | "autocomplete"
    | "checkbox"
    | "multi-autocomplete"
    | "multi-select"
    | "radio"
    | "radio-group"
    | "select"
    | "text"
    | "switch"
    | "date";

export const FIELD_TYPES_MAPPING: Record<FieldTypes, React.FunctionComponent<any>> = {
    autocomplete: AutocompleteField,
    checkbox: CheckboxField,
    "multi-autocomplete": MultiAutocompleteField,
    "multi-select": MultiSelectField,
    radio: RadioField,
    "radio-group": RadioGroupField,
    select: SelectField,
    text: TextField,
    switch: SwitchField,
    date: DatePickerField,
};

export type FieldPropMapping<T extends FieldTypes> = BaseFieldProps & T extends "autocomplete"
    ? AutocompleteProps
    : T extends "checkbox"
    ? CheckboxProps
    : T extends "multi-autocomplete"
    ? MultiAutocompleteProps
    : T extends "multi-select"
    ? MultiSelectProps
    : T extends "radio"
    ? RadioProps
    : T extends "radio-group"
    ? RadioGroupProps
    : T extends "select"
    ? SelectProps
    : T extends "text"
    ? InputProps
    : T extends "switch"
    ? SwitchProps
    : T extends "date"
    ? DatePickerProps
    : {};

function resolveFieldType({
    fieldType,
    labelResolver,
    multiple,
    options,
    querySearcher,
    type,
}: {
    fieldType?: FieldTypes;
    labelResolver?: AutocompleteProps["labelResolver"] | MultiAutocompleteProps["labelsResolver"];
    multiple?: boolean;
    options?: FieldOption[];
    querySearcher?: AutocompleteProps["querySearcher"] | MultiAutocompleteProps["querySearcher"];
    type?: string;
}): FieldTypes {
    if (fieldType) {
        return fieldType;
    }

    if (labelResolver && multiple && querySearcher) {
        return "multi-autocomplete";
    }

    if (labelResolver && querySearcher) {
        return "autocomplete";
    }

    if (multiple && options) {
        return "multi-select";
    }

    if (options) {
        return "select";
    }

    if (type === "date") {
        return "date";
    }

    if (type === "checkbox") {
        return "checkbox";
    }

    if (type === "radio") {
        return "radio";
    }

    return "text";
}

function patchType({ fieldType, type }: { fieldType?: FieldTypes; type?: string }): string | undefined {
    if (type) {
        return type;
    }

    if (fieldType === "checkbox") {
        return "checkbox";
    }

    if (fieldType === "radio") {
        return "radio";
    }

    return undefined;
}

export interface FieldProps<T extends FieldTypes> {
    /**
     * Component to use in field
     */
    FieldComponent?: React.FunctionComponent<any>;
    /**
     * Type of field
     */
    fieldType?: T;
    /**
     * Label for field
     */
    label?: string;
    /**
     * Function to resolve a label (see Autocomplete & MultiAutocomplete)
     */
    labelResolver?: AutocompleteProps["labelResolver"] | MultiAutocompleteProps["labelsResolver"];
    /**
     * If multiple values
     */
    multiple?: boolean;
    /**
     * Value to handle from Formik
     */
    name: string;
    /**
     * Options for Select/MultiSelect field
     */
    options?: FieldOption[];
    /**
     * Type of input
     */
    type?: string;
    /**
     * Function to search given a filter
     */
    querySearcher: AutocompleteProps["querySearcher"] | MultiAutocompleteProps["querySearcher"];
}

export function Field<T extends FieldTypes = "text">({
    FieldComponent: FieldComponentProp,
    fieldType: fieldTypeProp,
    label,
    labelResolver,
    multiple = false,
    name,
    options,
    querySearcher,
    type: typeProp,
    ...otherProps
}: FieldProps<T> & FieldPropMapping<T>) {
    const fieldType = resolveFieldType({
        fieldType: fieldTypeProp,
        multiple,
        options,
        querySearcher,
        labelResolver,
        type: typeProp,
    });
    const type = patchType({ fieldType, type: typeProp });

    const [field, meta] = useField({ name, type });

    const fieldProps = {
        id: field?.name,
        label,
        labelResolver,
        options,
        querySearcher,
        type,
        withFormik: true,
        ...field,
        ...otherProps,
        error: meta.touched && meta.error ? meta.error : undefined,
    };

    const FieldComponent = FieldComponentProp ?? FIELD_TYPES_MAPPING[fieldType];

    return <FieldComponent {...fieldProps} />;
}

Field.propTypes = {};
