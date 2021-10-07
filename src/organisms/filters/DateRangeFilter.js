// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useFormikContext } from "formik";

// Components
import { DateRangePickerField } from "../../molecules/inputs";
import { Field } from "../forms";
import { FilterLabel } from "./FilterLabel";

export function DateRangeFilter({ className, name, orderName: orderNameProp, ...otherProps }) {
    const rootClassName = classnames("thc-c-filter thc-date-range-filter", className);
    const formik = useFormikContext();

    const orderName = orderNameProp ?? `${name}Order`;

    return (
        <Field
            {...otherProps}
            fieldClassName={rootClassName}
            endAdornment="calendar"
            FieldComponent={DateRangePickerField}
            LabelComponent={FilterLabel}
            labelProps={{
                onSortClick(newOrder) {
                    formik.setFieldValue(orderName, newOrder);
                },
                sortOrder: formik.values[orderName],
            }}
            name={name}
        />
    );
}

DateRangeFilter.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Name
     */
    name: PropTypes.string,
    /**
     * Order name
     */
    orderName: PropTypes.string,
};
