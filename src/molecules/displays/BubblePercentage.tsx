// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { formatNumber } from "../../core/formatters";

export interface BubblePercentageProps extends React.PropsWithChildren<{}> {
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
    const rootClassName = classnames("thc-c-bubble-percentage thc-u-text--subtitle-bold", className);

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="thc-c-bubble-percentage__mask" style={{ height: `${percentage}%` }} />
            <div className="thc-c-bubble-percentage__percentage">{`${formatNumber(percentage)}%`}</div>
        </div>
    );
}
