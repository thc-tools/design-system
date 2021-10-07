// Libs
import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";

// Components
import {
    AutocompleteField,
    CheckboxField,
    MultiAutocompleteField,
    MultiSelectField,
    RadioField,
    RadioGroupField,
    SelectField,
    TextField,
    SwitchField,
    DatePickerField,
} from "../../molecules/inputs";

export const FIELD_TYPES = {
    AUTOCOMPLETE: "autocomplete",
    CHECKBOX: "checkbox",
    MULTI_AUTOCOMPLETE: "multi-autocomplete",
    MULTI_SELECT: "multi-select",
    RADIO: "radio",
    RADIO_GROUP: "radio-GROUP",
    SELECT: "select",
    TEXT: "text",
    SWITCH: "switch",
    DATE: "date",
};

export const FIELD_TYPES_MAPPING = {
    [FIELD_TYPES.AUTOCOMPLETE]: AutocompleteField,
    [FIELD_TYPES.CHECKBOX]: CheckboxField,
    [FIELD_TYPES.MULTI_AUTOCOMPLETE]: MultiAutocompleteField,
    [FIELD_TYPES.MULTI_SELECT]: MultiSelectField,
    [FIELD_TYPES.RADIO]: RadioField,
    [FIELD_TYPES.RADIO_GROUP]: RadioGroupField,
    [FIELD_TYPES.SELECT]: SelectField,
    [FIELD_TYPES.TEXT]: TextField,
    [FIELD_TYPES.SWITCH]: SwitchField,
    [FIELD_TYPES.DATE]: DatePickerField,
};

function resolveFieldType({ fieldType, labelResolver, multiple, options, querySearcher, type }) {
    if (fieldType) {
        return fieldType;
    }

    if (labelResolver && multiple && querySearcher) {
        return FIELD_TYPES.MULTI_AUTOCOMPLETE;
    }

    if (labelResolver && querySearcher) {
        return FIELD_TYPES.AUTOCOMPLETE;
    }

    if (multiple && options) {
        return FIELD_TYPES.MULTI_SELECT;
    }

    if (options) {
        return FIELD_TYPES.SELECT;
    }

    if (type === "date") {
        return FIELD_TYPES.DATE;
    }

    if (type === "checkbox") {
        return FIELD_TYPES.CHECKBOX;
    }

    if (type === "radio") {
        return FIELD_TYPES.RADIO;
    }

    return FIELD_TYPES.TEXT;
}

function patchType({ fieldType, type }) {
    if (type) {
        return type;
    }

    if (fieldType === FIELD_TYPES.CHECKBOX) {
        return "checkbox";
    }

    if (fieldType === FIELD_TYPES.RADIO) {
        return "radio";
    }

    return undefined;
}

export function Field({
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
}) {
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

Field.propTypes = {
    /**
     * Component to use in field
     */
    FieldComponent: PropTypes.elementType,
    /**
     * Type of field
     */
    fieldType: PropTypes.oneOf(Object.values(FIELD_TYPES)),
    /**
     * Label for field
     */
    label: PropTypes.string,
    /**
     * Function to resolve a label (see Autocomplete & MultiAutocomplete)
     */
    labelResolver: PropTypes.func,
    /**
     * If multiple values
     */
    multiple: PropTypes.bool,
    /**
     * Value to handle from Formik
     */
    name: PropTypes.string,
    /**
     * Options for Select/MultiSelect field
     */
    options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
    /**
     * Function to search given a filter
     */
    querySearcher: PropTypes.func,
};
