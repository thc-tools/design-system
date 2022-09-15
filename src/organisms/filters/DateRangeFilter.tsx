// Libs
import clsx from "clsx";
import { DateRangePicker, DateRangePickerProps } from "src/design-system/molecules/inputs";

// Components

export interface DateRangeFilterProps extends Omit<DateRangePickerProps, "onChange"> {
    onChange: (value: DateRangePickerProps["value"]) => void;
}

export function DateRangeFilter({
    className: classNameProp,
    onChange,
    ...otherProps
}: DateRangeFilterProps): JSX.Element {
    const className = clsx("ds-c-filter", classNameProp);
    return (
        <DateRangePicker
            {...otherProps}
            className={className}
            endAdornment="arrow-dropdown"
            inputClassName="ds-u-typography--body"
            InputComponent="div"
            onChange={(evt) => onChange(evt.target.value as DateRangePickerProps["value"])}
            startAdornment="calendar-today"
        />
    );
}
