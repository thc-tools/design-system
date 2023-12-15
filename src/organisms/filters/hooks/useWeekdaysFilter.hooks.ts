// Libs
import { useCallback, useMemo, useState } from "react";
import { FieldOption } from "src/design-system/molecules/inputs/_utils";
import { daysOfTheWeek } from "src/utils/formatters";

const WEEKDAYS_DEFAULT_VALUE = [];

export type UseWeekdaysFilterValue = string[];

export interface UseWeekdaysFilterOptions {
    defaultValue?: UseWeekdaysFilterValue;
    initialValue?: UseWeekdaysFilterValue;
}

export interface UseWeekdaysFilterResult {
    handleWeekdaysChange: (weekdays: UseWeekdaysFilterValue) => void;
    isEmpty: boolean;
    resetFilter: () => void;
    weekdays: UseWeekdaysFilterValue;
    weekdaysOptions: FieldOption[];
}

/**
 * Hook to handle a Weekdays filter
 * @param options Hooks options
 * @returns Helpers to handle Weekdays filter
 */
export function useWeekdaysFilter({
    defaultValue = WEEKDAYS_DEFAULT_VALUE,
    initialValue,
}: UseWeekdaysFilterOptions = {}): UseWeekdaysFilterResult {
    const [weekdays, setWeekdays] = useState<UseWeekdaysFilterValue>(initialValue ?? defaultValue);

    const weekdaysOptions = useMemo<FieldOption[]>(
        () => daysOfTheWeek().map((item) => ({ value: item.name, label: item.label })),
        []
    );

    const resetFilter = useCallback(() => setWeekdays(defaultValue), [setWeekdays, defaultValue]);

    return {
        handleWeekdaysChange: setWeekdays,
        isEmpty: isWeekdaysFilterEmpty(weekdays),
        resetFilter,
        weekdays,
        weekdaysOptions,
    };
}

/**
 * Format Weekday filter value
 * @param weekdays Filter value
 * @param weekdaysOptions Weekday options
 * @returns Formatted filter value
 */
export function formatWeekdayFilter(
    weekdays: UseWeekdaysFilterValue = WEEKDAYS_DEFAULT_VALUE,
    weekdaysOptions: FieldOption[] = []
): string {
    return weekdays.map((wd) => weekdaysOptions.find((wdOpt) => wdOpt.value === wd)?.label).join(", ");
}

/**
 * Compute if filter is empty or not
 * @param filter Filter value
 * @returns If is empty
 */
export function isWeekdaysFilterEmpty(filter: UseWeekdaysFilterValue = WEEKDAYS_DEFAULT_VALUE): boolean {
    return filter.length === 0;
}
