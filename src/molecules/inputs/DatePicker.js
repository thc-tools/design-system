// Libs
import React, { useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DayPickerSingleDateController } from "react-dates";
import moment from "moment";

// Utils
import { formatDate } from "../../core/formatters";
import { patchFormEventValue } from "../../core/utils";

// Components
import { Dropdown } from "../modals";
import { FieldHoc } from "./Field";
import { Input } from "./Input";

export function DatePicker({
    className,
    datePickerProps,
    dropDownProps,
    id,
    name,
    onChange,
    value: valueProp,
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-date-picker", className);

    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleChange = (date) => {
        if (onChange) {
            const newEvent = patchFormEventValue({}, inputRef.current, date.toISOString());

            onChange(newEvent);
            setOpen(false);
            inputRef.current.focus();
        }
    };

    const value = useMemo(() => (valueProp ? moment(valueProp) : undefined), [valueProp]);

    return (
        <div className={rootClassName}>
            <Input
                {...otherProps}
                adornmentProps={{ onClick: () => setOpen(true) }}
                className="thc-c-date-picker__input"
                endAdornment="calendar"
                focused={open}
                id={id}
                name={name}
                onClick={() => setOpen(true)}
                ref={inputRef}
                value={valueProp ? formatDate(valueProp) : ""}
            />
            <Dropdown
                {...dropDownProps}
                anchorEl={inputRef}
                contentClassName="thc-c-date-picker__calendar"
                onClose={() => setOpen(false)}
                open={open}
            >
                <DayPickerSingleDateController
                    {...datePickerProps}
                    date={value}
                    focused
                    hideKeyboardShortcutsPanel
                    numberOfMonths={2}
                    noBorder
                    onDateChange={handleChange}
                />
            </Dropdown>
        </div>
    );
}

DatePicker.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Additional props for date picker
     */
    datePickerProps: PropTypes.shape(DayPickerSingleDateController.propTypes),
    /**
     * Additional props for Dropdown
     */
    dropDownProps: PropTypes.shape(Dropdown.propTypes),
    /**
     * Input identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Input name
     */
    name: PropTypes.string,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Current value
     */
    value: PropTypes.string,
};

export const DatePickerField = FieldHoc(DatePicker, "DatePicker");
