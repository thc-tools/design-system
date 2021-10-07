// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapLabel, filterProps } from "../../core/utils";

export function FieldHelperText({
    children,
    className,
    disabled = false,
    hasError = false,
    hasSuccess = false,
    hasWarning = false,
    helperText,
    id,
    ...otherProps
}) {
    const helperClassName = classnames(
        "thc-c-field-helper-text",
        {
            "thc-c-field-helper-text--error": hasError && !disabled,
            "thc-c-field-helper-text--success": hasSuccess && !disabled,
            "thc-c-field-helper-text--warning": hasWarning && !disabled,
        },
        className
    );

    const wrappedChild = wrapLabel(helperText ?? children);

    return (
        <div {...filterProps(otherProps)} className={helperClassName} disabled={disabled === true} id={id}>
            {wrappedChild}
        </div>
    );
}

FieldHelperText.propTypes = {
    /**
     * Content of the HelperText
     */
    children: PropTypes.node,
    /**
     * Additional className for the HelperText
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * If has an error
     */
    hasError: PropTypes.bool,
    /**
     * If has a success
     */
    hasSuccess: PropTypes.bool,
    /**
     * If has a warning
     */
    hasWarning: PropTypes.bool,
    /**
     * Identifier
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * Helper text
     */
    helperText: PropTypes.string,
};
