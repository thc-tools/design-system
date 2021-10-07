// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useFormikContext } from "formik";

// Components
import { Field } from "../forms";
import { FilterLabel } from "./FilterLabel";

export function TextFilter({ className, name, orderName: orderNameProp, ...otherProps }) {
    const rootClassName = classnames("thc-c-filter thc-text-filter", className);
    const formik = useFormikContext();

    const orderName = orderNameProp ?? `${name}Order`;

    return (
        <Field
            {...otherProps}
            fieldClassName={rootClassName}
            LabelComponent={FilterLabel}
            labelProps={{
                onSortClick(newOrder) {
                    formik.setFieldValue(orderName, newOrder);
                },
                sortOrder: formik.values[orderName],
            }}
            name={name}
            startAdornment="search"
        />
    );
}

TextFilter.propTypes = {
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
