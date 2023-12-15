// Libs
import clsx from "clsx";
import { trim } from "lodash";
import { flow } from "lodash/fp";
import React from "react";

// Components
import { Icons } from "src/design-system/molecules/icons";
import { Input, InputProps } from "src/design-system/molecules/inputs";

// Utils
import { wrapLabel } from "src/design-system/core/utils";
import { oldFormatNumber } from "src/utils/formatters"; // TODO: MOVE THIS FORMATER TO DS

function applyFactor(number: number, factor: number) {
    return number !== undefined ? number * factor : undefined;
}

function roundFloat(number: number, factor: number) {
    return Math.round(applyFactor(number, factor) * 100) / 100;
}

const applyIfDefined =
    <V, R>(callback: (value: V) => R) =>
    (value: V): R => {
        if (value === undefined) {
            return undefined;
        }

        return callback(value);
    };

export interface MinMaxInputsProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Optional end adornment
     */
    endAdornment?: React.ReactNode;
    /**
     * Numeric factor
     */
    factor?: number;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Addition input props
     */
    inputProps?: Partial<InputProps>;
    /**
     * Label in between min & max
     */
    joinLabel?: string;
    /**
     * Max ref
     */
    maxRef?: React.MutableRefObject<any>;
    /**
     * Min ref
     */
    minRef?: React.MutableRefObject<any>;
    /**
     * Filter name
     */
    name?: string;
    /**
     * Change handler
     */
    onChange: (value: { min?: number; max?: number }) => void;
    /**
     * Placeholders
     */
    placeholder?: { min?: number; max?: number };
    /**
     * Label to display before min & max
     */
    prefixLabel?: string;
    /**
     * Start adornment
     */
    startAdornment?: React.ReactNode;
    /**
     * Value
     */
    value?: { min?: number; max?: number };
    /**
     * Step for values
     */
    step?: number;
}

export function MinMaxInputs({
    className: classNameProp,
    endAdornment,
    factor = 1,
    inputProps,
    joinLabel,
    maxRef,
    minRef,
    name,
    onChange: handleChange,
    placeholder: { min: placeholderMinProp, max: placeholderMaxProp } = {},
    prefixLabel,
    value: { min: minProp, max: maxProp } = {},
    startAdornment,
    step,
}: MinMaxInputsProps): JSX.Element {
    const className = clsx("ds-c-min-max-input", classNameProp);

    const handleRangeChangeFor = (key: "min" | "max") => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        handleChange({
            min: minProp,
            max: maxProp,
            [key]:
                value !== undefined && trim(value) !== ""
                    ? Number(applyFactor(Number.parseFloat(value), factor).toFixed(1))
                    : undefined,
        });
    };

    const placeholderMin = flow((v) => applyFactor(v, 1 / factor), applyIfDefined(Math.floor))(placeholderMinProp);
    const placeholderMax = flow((v) => applyFactor(v, 1 / factor), applyIfDefined(Math.ceil))(placeholderMaxProp);

    const min = roundFloat(minProp, 1 / factor);
    const max = roundFloat(maxProp, 1 / factor);

    return (
        <div className={className}>
            {wrapLabel(prefixLabel)}
            <Input
                ref={minRef}
                endAdornment={endAdornment}
                hasError={
                    min !== undefined &&
                    (min < placeholderMin || min > placeholderMax || (max !== undefined && min > max))
                }
                min={placeholderMin}
                max={Math.min(placeholderMax ?? Number.MAX_VALUE, max ?? Number.MAX_VALUE)}
                name={`${name}-min`}
                onChange={handleRangeChangeFor("min")}
                placeholder={oldFormatNumber(placeholderMin)}
                showMinMax={false}
                showIncrementDecrement={false}
                startAdornment={startAdornment}
                step={step}
                type="number"
                value={min}
                {...inputProps}
            />
            {wrapLabel(joinLabel)}
            <Input
                ref={maxRef}
                endAdornment={endAdornment}
                hasError={
                    max !== undefined &&
                    (max > placeholderMax || max < placeholderMin || (min !== undefined && max < min))
                }
                min={Math.max(placeholderMin ?? Number.MIN_VALUE, min ?? Number.MIN_VALUE)}
                max={placeholderMax}
                name={`${name}-max`}
                onChange={handleRangeChangeFor("max")}
                placeholder={oldFormatNumber(placeholderMax)}
                showMinMax={false}
                showIncrementDecrement={false}
                startAdornment={startAdornment}
                step={step}
                type="number"
                value={max}
                {...inputProps}
            />
        </div>
    );
}
