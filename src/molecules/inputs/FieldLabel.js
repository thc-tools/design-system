// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapLabel, filterProps } from "../../core/utils";

export function FieldLabel({
    children,
    className,
    disabled = false,
    hasError = false,
    id,
    label,
    required = false,
    ...otherProps
}) {
    const labelClassName = classnames(
        "thc-c-field-label",
        {
            "thc-c-field-label--error": hasError && !disabled,
        },
        "thc-u-text--label-bold",
        {
            "thc-u-status--error": hasError && !disabled,
        },
        className
    );

    const wrappedChild = wrapLabel(label ?? children);

    return (
        <div {...filterProps(otherProps)} className={labelClassName} id={id} disabled={disabled === true}>
            {wrappedChild}
            {required && <sup className="thc-c-field-label__required">*</sup>}
        </div>
    );
}

FieldLabel.propTypes = {
    /**
     * Content of Label
     */
    children: PropTypes.node,
    /**
     * Additional className for Label
     */
    className: PropTypes.string,
    /**
     * If disabled
     */
    disabled: PropTypes.bool,
    /**
     * If has an error
     */
    hasError: PropTypes.bool,
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Label
     */
    label: PropTypes.string,
    /**
     * If is required
     */
    required: PropTypes.bool,
};
