// Libs
import clsx from "clsx";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import * as locales from "react-date-range/dist/locale";

// Utils
import { formatDate } from "src/design-system/core/formatters";
import { getCSSVariable, patchFormEventValue } from "src/design-system/core/utils";
import { getCalendarLocale, getLocale } from "src/i18n";

// Components
import {
    DateRange as RDRDateRange,
    DateRangePicker as RDRDateRangePicker,
    DateRangePickerProps as RDRDateRangePickerProps,
    DateRangeProps as RDRDateRangeProps,
    Range,
    StaticRange,
} from "react-date-range";
import { Dropdown, DropdownProps } from "../modals";
import { FieldHoc } from "./Field";
import { Input, InputProps } from "./Input";

const DEFAULT_VALUE: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

function findCorrectRange(
    options: StaticRange[],
    { startDate, endDate }: { startDate?: string; endDate?: string },
    defaultRange?: Range | null
): Range | null {
    if (startDate === undefined && endDate === undefined) {
        return {
            startDate: defaultRange.startDate,
            endDate: defaultRange.endDate,
            key: defaultRange?.key,
        };
    }

    const ranges = options.map((e) => e.range() as Range);
    const correctRange = ranges.find(
        (r) => moment(r.startDate).isSame(moment(startDate), "day") && moment(r.endDate).isSame(moment(endDate), "day")
    );

    if (!correctRange) {
        return {
            startDate: moment(startDate).toDate(),
            endDate: moment(endDate).toDate(),
            key: "selection",
        };
    }

    return {
        startDate: moment(startDate).toDate(),
        endDate: moment(endDate).toDate(),
        key: correctRange.key,
    };
}

export interface DateRangePickerProps extends Omit<InputProps, "value"> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional props for range picker
     */
    dateRangePickerProps?: RDRDateRangePickerProps | RDRDateRangeProps;
    /**
     * Default value (today)
     */
    defaultValue?: Range;
    /**
     * If date is disabled
     */
    disableFuture?: (date: Date) => boolean;
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
     * Ranges to show as options
     */
    options?: StaticRange[];
    /**
     * Current value
     */
    value?: { startDate?: string; endDate?: string };
    /**
     * If is displayed with static ranges
     */
    withStaticRanges?: boolean;
}

export function DateRangePicker({
    className,
    dateRangePickerProps,
    defaultValue = DEFAULT_VALUE,
    disableFuture,
    dropdownProps,
    endAdornment,
    id,
    name,
    onChange,
    options = [],
    value = {},
    withStaticRanges = false,
    ...otherProps
}: DateRangePickerProps): JSX.Element {
    const rootClassName = clsx("ds-c-date-range-picker", className);

    const inputRef = useRef<HTMLInputElement>(null);
    const inputContainerRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<Range>(findCorrectRange(options, value, defaultValue));

    const locale = getLocale();
    const calendarLocale = getCalendarLocale(locale);

    useEffect(() => {
        const correctRange = findCorrectRange(options, value, defaultValue);
        if (state.key !== correctRange.key) {
            setState(correctRange);
        }
        if (
            state.key === "selection" &&
            (!moment(state.startDate).isSame(value.startDate, "day") ||
                !moment(state.endDate).isSame(value.endDate, "day"))
        ) {
            setState(correctRange);
        }
    }, [value.startDate, value.endDate]);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (onChange) {
            const newEvent = patchFormEventValue({} as React.SyntheticEvent<HTMLInputElement>, inputRef.current, {
                startDate: state.startDate.toISOString(),
                endDate: state.endDate.toISOString(),
            });

            onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
            inputRef.current?.focus();
        }
    };

    const color = getCSSVariable("--ds-color--primary-500");

    let child: React.ReactNode;
    if (options.length > 0 || withStaticRanges) {
        child = (
            <RDRDateRangePicker
                className="ds-u-typography--body"
                direction="horizontal"
                disabledDay={(date) => (disableFuture ? disableFuture(date) : false)}
                inputRanges={[]}
                locale={locales[calendarLocale]}
                months={2}
                onChange={(item) => {
                    const [key] = Object.keys(item);
                    setState(item[key]);
                }}
                rangeColors={[color]}
                ranges={[state]}
                staticRanges={options.length > 1 ? options : undefined}
                weekStartsOn={1}
                {...dateRangePickerProps}
            />
        );
    } else {
        child = (
            <RDRDateRange
                className="ds-u-typography--body"
                direction="horizontal"
                disabledDay={(date) => (disableFuture ? disableFuture(date) : false)}
                locale={locales[calendarLocale]}
                months={2}
                onChange={(item) => setState(item.selection)}
                rangeColors={[color]}
                ranges={[state]}
                weekStartsOn={1}
                {...dateRangePickerProps}
            />
        );
    }

    return (
        <div className={rootClassName}>
            <Input
                {...otherProps}
                className="ds-c-date-picker__input"
                endAdornment={endAdornment ?? "calendar-today"}
                focused={open}
                id={id}
                name={name}
                onClick={handleClick}
                ref={inputRef}
                containerRef={inputContainerRef}
                type="date"
                value={
                    value.startDate || value.endDate
                        ? `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`
                        : ""
                }
            />
            <Dropdown
                {...dropdownProps}
                anchorEl={inputContainerRef}
                contentClassName="ds-c-date-picker__calendar"
                onClose={handleClose}
                open={open}
            >
                {child}
            </Dropdown>
        </div>
    );
}

export const DateRangePickerField = FieldHoc(DateRangePicker, "DateRangePicker");
