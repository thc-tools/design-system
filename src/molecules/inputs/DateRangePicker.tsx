// Libs
import classnames from "classnames";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { DayPickerRangeController, DayPickerRangeControllerShape, FocusedInputShape } from "react-dates";

// Utils
import { formatDate } from "../../core/formatters";
import { patchFormEventValue } from "../../core/utils";

// Components
import { Dropdown, DropdownProps } from "../modals";
import { FieldHoc } from "./Field";
import { Input } from "./Input";

export interface DateRangePickerProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional props for range picker
     */
    dateRangePickerProps?: DayPickerRangeControllerShape;
    /**
     * Additional props for Dropdown
     */
    dropdownProps?: DropdownProps;
    /**
     * Input identifier
     */
    id: string;
    /**
     * Input name
     */
    name: string;
    /**
     * Change handler
     */
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    /**
     * Current value
     */
    value?: { startDate?: string; endDate?: string };
}

export function DateRangePicker({
    className,
    dateRangePickerProps,
    dropdownProps,
    id,
    name,
    onChange,
    value: { startDate: startDateProp, endDate: endDateProp } = {},
    ...otherProps
}: DateRangePickerProps) {
    const rootClassName = classnames("thc-c-date-range-picker", className);

    const inputRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

    const [{ startDate: startDateState, endDate: endDateState }, setDatesState] = useState({
        startDate: startDateProp ? moment(startDateProp) : null,
        endDate: endDateProp ? moment(endDateProp) : null,
    });

    const prevDateProps = useRef({
        startDate: startDateProp,
        endDate: endDateProp,
    });
    useEffect(() => {
        if (startDateProp !== prevDateProps.current.startDate || endDateProp !== prevDateProps.current.endDate) {
            setDatesState({
                startDate: startDateProp ? moment(startDateProp) : null,
                endDate: endDateProp ? moment(endDateProp) : null,
            });
        }
        prevDateProps.current = {
            startDate: startDateProp,
            endDate: endDateProp,
        };
    }, [startDateProp, endDateProp, startDateState, endDateState]);

    const handleChange = ({
        startDate: startDateChange,
        endDate: endDateChange,
    }: {
        startDate: moment.Moment | null;
        endDate: moment.Moment | null;
    }) => {
        if (onChange) {
            if (focusedInput === "startDate") {
                setDatesState({ startDate: startDateChange, endDate: null });
            } else {
                const newEvent = patchFormEventValue({}, inputRef.current, {
                    startDate: startDateChange?.toISOString(),
                    endDate: endDateChange?.toISOString(),
                });

                onChange(newEvent);
                setOpen(false);
                inputRef.current?.focus();
            }
        }
    };

    const handleClick = () => {
        setFocusedInput("startDate");
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
                type="date"
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

export const DateRangePickerField = FieldHoc(DateRangePicker, "DateRangePicker");
