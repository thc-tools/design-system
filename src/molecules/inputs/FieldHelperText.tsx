// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { filterProps, wrapLabel } from "../../core/utils";

export interface FieldHelperTextProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for the HelperText
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * If has an error
     */
    hasError?: boolean;
    /**
     * If has a success
     */
    hasSuccess?: boolean;
    /**
     * If has a warning
     */
    hasWarning?: boolean;
    /**
     * Identifier
     */
    id: string;
    /**
     * Helper text
     */
    helperText?: string;
}

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
}: FieldHelperTextProps) {
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
