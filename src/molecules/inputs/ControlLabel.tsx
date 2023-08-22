// Libs
import classnames from "classnames";
import React from "react";

// Util
import { DivProps, alterElement, filterProps } from "../../core/utils";

export type ControlLabelPosition = "top" | "right" | "bottom" | "left";

export interface ControlLabelProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for control label
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * If has error
     */
    hasError?: boolean;
    /**
     * Identifier for input
     */
    id?: string;
    /**
     * Label
     */
    label: React.ReactNode;
    /**
     * Additional className for label
     */
    labelClassName?: string;
    /**
     * Position for label
     */
    labelPosition?: ControlLabelPosition;
    /**
     * Additional props for label
     */
    labelProps?: DivProps;
}

/**
 * Drop in replacement of the Radio, Switch and Checkbox component. Use this component if you want to display an extra label.
 *
 * ```js
 * import { ControlLabel } from "./components/molecules/inputs"
 * ```
 */
export function ControlLabel({
    children,
    className,
    disabled,
    hasError,
    id,
    label,
    labelClassName: labelClassNameProp,
    labelPosition = "right",
    labelProps,
    ...otherProps
}: ControlLabelProps) {
    const controlLabelClassName = classnames(
        "thc-c-control-label",
        {
            "thc-c-control-label--top": labelPosition === "top",
            "thc-c-control-label--right": labelPosition === "right",
            "thc-c-control-label--bottom": labelPosition === "bottom",
            "thc-c-control-label--left": labelPosition === "left",
            "thc-u-status--error": !disabled && hasError,
        },
        className
    );
    const labelClassName = classnames("thc-c-control-label__label", labelClassNameProp);
    const controlClassName = classnames("thc-c-control-label__control");

    return (
        <label {...filterProps(otherProps)} className={controlLabelClassName} disabled={disabled === true} htmlFor={id}>
            {alterElement(React.Children.only(children), { className: controlClassName })}
            {alterElement(label, { ...labelProps, className: labelClassName })}
        </label>
    );
}
