// Libs
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useFormikContext } from "formik";

// Components
import { CardContent } from "../../molecules/cards";
import { CheckboxGroup, TextField } from "../../molecules/inputs";
import { Dropdown } from "../../molecules/modals";
import { Field } from "../forms";
import { FilterLabel } from "./FilterLabel";

export function SelectCheckboxFilter({
    className,
    hasSelectAll,
    name,
    icon = "angle-down",
    iconFocus = "angle-up",
    orderName: orderNameProp,
    options = [],
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-select-checkbox-filter", className);
    const formik = useFormikContext();

    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    const valueLength = formik.values[name].length;
    let valueDisplay = "";
    if (valueLength > 0) {
        valueDisplay = options.find((opt) => opt.value === formik.values[name][0]).label;

        if (valueLength > 1) {
            valueDisplay = `${valueDisplay} (+${valueLength - 1})`;
        }
    }

    const orderName = orderNameProp ?? `${name}Order`;

    return (
        <div className="thc-c-filter thc-c-field">
            <TextField
                {...otherProps}
                fieldClassName={rootClassName}
                endAdornment={open ? iconFocus : icon}
                LabelComponent={FilterLabel}
                labelProps={{
                    onSortClick(newOrder) {
                        formik.setFieldValue(orderName, newOrder);
                    },
                    sortOrder: formik.values[orderName],
                }}
                name={`${name}-input`}
                value={valueDisplay}
                onClick={() => setOpen(true)}
                ref={inputRef}
            />
            <Dropdown anchorEl={inputRef} onClose={() => setOpen(false)} open={open}>
                <CardContent>
                    <Field FieldComponent={CheckboxGroup} hasSelectAll={hasSelectAll} name={name} options={options} />
                </CardContent>
            </Dropdown>
        </div>
    );
}

SelectCheckboxFilter.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If has selectAll
     */
    hasSelectAll: PropTypes.bool,
    /**
     * Name
     */
    name: PropTypes.string,
    /**
     * Icon (closed state)
     */
    icon: PropTypes.node,
    /**
     * Icon (opened state)
     */
    iconFocus: PropTypes.node,
    /**
     * Order name
     */
    orderName: PropTypes.string,
    /**
     * Options
     */
    options: CheckboxGroup.propTypes.options,
};
