// Libs
import classnames from "classnames";
import moment from "moment";
import React, { useMemo, useRef, useState } from "react";
import { DayPickerSingleDateController, DayPickerSingleDateControllerShape } from "react-dates";

// Utils
import { formatDate } from "../../core/formatters";
import { patchFormEventValue } from "../../core/utils";

// Components
import { Dropdown, DropdownProps } from "../modals";
import { FieldHoc } from "./Field";
import { Input } from "./Input";

export interface DatePickerProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional props for date picker
     */
    datePickerProps?: DayPickerSingleDateControllerShape;
    /**
     * Additional props for Dropdown
     */
    dropDownProps?: DropdownProps;
    /**
     * Input identifier
     */
    id?: string;
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
    value: string;
}

export function DatePicker({
    className,
    datePickerProps,
    dropDownProps,
    id,
    name,
    onChange,
    value: valueProp,
    ...otherProps
}: DatePickerProps) {
    const rootClassName = classnames("thc-c-date-picker", className);

    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    const handleChange = (date: any) => {
        if (onChange) {
            const newEvent = patchFormEventValue({}, inputRef.current, date.toISOString());

            onChange(newEvent);
            setOpen(false);
            inputRef.current?.focus();
        }
    };

    const value = useMemo(() => (valueProp ? moment(valueProp) : null), [valueProp]);

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
                type="date"
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

export const DatePickerField = FieldHoc(DatePicker, "DatePicker");
