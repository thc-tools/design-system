// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { filterProps, wrapLabel } from "../../core/utils";

export interface FieldLabelProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for Label
     */
    className?: string;
    /**
     * If disabled
     */
    disabled?: boolean;
    /**
     * If has an error
     */
    hasError?: boolean;
    /**
     * Identifier
     */
    id?: string;
    /**
     * Label
     */
    label?: string;
    /**
     * If is required
     */
    required?: boolean;
}

export function FieldLabel({
    children,
    className,
    disabled = false,
    hasError = false,
    id,
    label,
    required = false,
    ...otherProps
}: FieldLabelProps) {
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
