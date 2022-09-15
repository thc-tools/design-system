// Libs
import clsx from "clsx";
import moment from "moment";
import React, { useMemo, useRef, useState } from "react";
import * as locales from "react-date-range/dist/locale";

// Utils
import { getCalendarLocale, getLocale } from "src/i18n";
import { formatDate } from "../../core/formatters";
import { getCSSVariable, patchFormEventValue } from "../../core/utils";

// Components
import { Calendar, CalendarProps } from "react-date-range";
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
    datePickerProps?: CalendarProps;
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
}: DatePickerProps): JSX.Element {
    const rootClassName = clsx("ds-c-date-picker", className);

    const inputRef = useRef<HTMLInputElement>(null);
    const inputContainerRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    const handleChange = (date: Date) => {
        if (onChange) {
            const newEvent = patchFormEventValue(
                {} as React.SyntheticEvent<HTMLInputElement>,
                inputRef.current,
                date.toISOString()
            );

            onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
            setOpen(false);
            inputRef.current?.focus();
        }
    };

    const value = useMemo(() => (valueProp ? moment(valueProp).toDate() : null), [valueProp]);

    const color = getCSSVariable("--ds-color--primary-500");

    const locale = getLocale();
    const calendarLocale = getCalendarLocale(locale);

    return (
        <div className={rootClassName}>
            <Input
                {...otherProps}
                adornmentProps={{ onClick: () => setOpen(true) }}
                className="ds-c-date-picker__input"
                endAdornment="calendar"
                focused={open}
                id={id}
                name={name}
                onClick={() => setOpen(true)}
                ref={inputRef}
                containerRef={inputContainerRef}
                type="date"
                value={valueProp ? formatDate(valueProp) : ""}
            />
            <Dropdown
                {...dropDownProps}
                anchorEl={inputContainerRef}
                contentClassName="ds-c-date-picker__calendar"
                onClose={() => setOpen(false)}
                open={open}
            >
                <Calendar
                    onChange={handleChange}
                    locale={locales[calendarLocale]}
                    date={value}
                    color={color}
                    {...datePickerProps}
                />
            </Dropdown>
        </div>
    );
}

export const DatePickerField = FieldHoc(DatePicker, "DatePicker");
