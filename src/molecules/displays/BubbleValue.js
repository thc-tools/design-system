// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { formatNumber } from "../../core/formatters";

export const BUBBLE_VALUE_TYPE = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
};

export function BubbleValue({ className, label, precision, type = BUBBLE_VALUE_TYPE.PRIMARY, value, ...otherProps }) {
    const rootClassName = classnames(
        "thc-c-bubble-value",
        {
            "thc-c-bubble-value--primary": type === BUBBLE_VALUE_TYPE.PRIMARY,
            "thc-c-bubble-value--secondary": type === BUBBLE_VALUE_TYPE.SECONDARY,
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

BubbleValue.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Label for value
     */
    label: PropTypes.string,
    /**
     * Customize precision
     */
    precision: PropTypes.number,
    /**
     * Type of bubble value
     */
    type: PropTypes.oneOf(Object.values(BUBBLE_VALUE_TYPE)),
    /**
     * value
     */
    value: PropTypes.number,
};
