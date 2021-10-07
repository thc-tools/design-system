// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { formatNumber } from "../../core/formatters";

export function BubblePercentage({ className, percentage = 0, ...otherProps }) {
    const rootClassName = classnames("thc-c-bubble-percentage thc-u-text--subtitle-bold", className);

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="thc-c-bubble-percentage__mask" style={{ height: `${percentage}%` }} />
            <div className="thc-c-bubble-percentage__percentage">{`${formatNumber(percentage)}%`}</div>
        </div>
    );
}

BubblePercentage.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Percentage percentage
     */
    percentage: PropTypes.number,
};
