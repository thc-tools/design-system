// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { formatNumber } from "../../core/formatters";

export interface BubblePercentageProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Percentage percentage
     */
    percentage?: number;
}

export function BubblePercentage({ className, percentage = 0, ...otherProps }: BubblePercentageProps) {
    const rootClassName = clsx("ds-c-bubble-percentage ds-u-text--subtitle-bold", className);

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="ds-c-bubble-percentage__mask" style={{ height: `${percentage}%` }} />
            <div className="ds-c-bubble-percentage__percentage">{`${formatNumber(percentage)}%`}</div>
        </div>
    );
}
