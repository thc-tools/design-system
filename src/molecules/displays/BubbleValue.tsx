// Libs
import clsx from "clsx";

// Utils
import { formatNumber } from "../../core/formatters";

export type BubbleValueType = "primary" | "secondary";

export interface BubbleValueProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Label for value
     */
    label?: string;
    /**
     * Customize precision
     */
    precision?: number;
    /**
     * Type of bubble value
     */
    type?: BubbleValueType;
    /**
     * value
     */
    value: number;
}

export function BubbleValue({ className, label, precision, type = "primary", value, ...otherProps }: BubbleValueProps) {
    const rootClassName = clsx(
        "ds-c-bubble-value",
        {
            "ds-c-bubble-value--primary": type === "primary",
            "ds-c-bubble-value--secondary": type === "secondary",
        },
        className
    );

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="ds-c-bubble-value__value ds-u-text--subtitle-bold">{formatNumber(value, precision)}</div>
            {label && <div className="ds-c-bubble-value__label ds-u-text--subnormal">{label}</div>}
        </div>
    );
}
