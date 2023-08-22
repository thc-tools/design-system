// Libs
import classnames from "classnames";

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
    const rootClassName = classnames(
        "thc-c-bubble-value",
        {
            "thc-c-bubble-value--primary": type === "primary",
            "thc-c-bubble-value--secondary": type === "secondary",
        },
        className
    );

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="thc-c-bubble-value__value thc-u-text--subtitle-bold">{formatNumber(value, precision)}</div>
            {label && <div className="thc-c-bubble-value__label thc-u-text--subnormal">{label}</div>}
        </div>
    );
}
