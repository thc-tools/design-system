// Libs
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DayPickerRangeController } from "react-dates";
import moment from "moment";

// Utils
import { formatDate } from "../../core/formatters";
import { patchFormEventValue } from "../../core/utils";

// Components
import { Dropdown } from "../modals";
import { FieldHoc } from "./Field";
import { Input } from "./Input";

const START_DATE = "startDate";

export function DateRangePicker({
    className,
    dateRangePickerProps,
    dropdownProps,
    id,
    name,
    onChange,
    value: { startDate: startDateProp, endDate: endDateProp } = {},
    ...otherProps
}) {
    const rootClassName = classnames("thc-c-date-range-picker", className);

    const inputRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const [{ startDate: startDateState, endDate: endDateState }, setDatesState] = useState({
        startDate: startDateProp ? moment(startDateProp) : undefined,
        endDate: endDateProp ? moment(endDateProp) : undefined,
    });

    const prevDateProps = useRef({
        startDate: startDateProp,
        endDate: endDateProp,
    });
    useEffect(() => {
        if (startDateProp !== prevDateProps.current.startDate || endDateProp !== prevDateProps.current.endDate) {
            setDatesState({
                startDate: startDateProp ? moment(startDateProp) : undefined,
                endDate: endDateProp ? moment(endDateProp) : undefined,
            });
        }
        prevDateProps.current = {
            startDate: startDateProp,
            endDate: endDateProp,
        };
    }, [startDateProp, endDateProp, startDateState, endDateState]);

    const handleChange = ({ startDate: startDateChange, endDate: endDateChange }) => {
        if (onChange) {
            if (focusedInput === START_DATE) {
                setDatesState({ startDate: startDateChange, endDate: undefined });
            } else {
                const newEvent = patchFormEventValue({}, inputRef.current, {
                    startDate: startDateChange.toISOString(),
                    endDate: endDateChange.toISOString(),
                });

                onChange(newEvent);
                setOpen(false);
                inputRef.current.focus();
            }
        }
    };

    const handleClick = () => {
        setFocusedInput(START_DATE);
        setOpen(true);
    };

    const handleClose = () => {
        setFocusedInput(null);
        setOpen(false);
    };

    return (
        <div className={rootClassName}>
            <Input
                {...otherProps}
                adornmentProps={{ onClick: handleClick }}
                className="thc-c-date-picker__input"
                endAdornment="calendar"
                focused={open}
                id={id}
                name={name}
                onClick={handleClick}
                ref={inputRef}
                value={startDateProp ? `${formatDate(startDateProp)} -> ${formatDate(endDateProp)}` : ""}
            />
            <Dropdown
                {...dropdownProps}
                anchorEl={inputRef}
                contentClassName="thc-c-date-picker__calendar"
                onClose={handleClose}
                open={open}
            >
                <DayPickerRangeController
                    {...dateRangePickerProps}
                    endDate={endDateState}
                    focusedInput={focusedInput}
                    hideKeyboardShortcutsPanel
                    numberOfMonths={2}
                    noBorder
                    onDatesChange={handleChange}
                    onFocusChange={setFocusedInput}
                    startDate={startDateState}
                />
            </Dropdown>
        </div>
    );
}

DateRangePicker.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Additional props for range picker
     */
    dateRangePickerProps: PropTypes.shape(DayPickerRangeController.propTypes),
    /**
     * Additional props for Dropdown
     */
    dropdownProps: PropTypes.shape(Dropdown.propTypes),
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
    value: PropTypes.shape({ startDate: PropTypes.string, endDate: PropTypes.string }),
};

export const DateRangePickerField = FieldHoc(DateRangePicker, "DateRangePicker");
