// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Util
import { alterElement, filterProps } from "../../core/utils";

export const CONTROL_LABEL_POSITION = {
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left",
};

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
    labelPosition = CONTROL_LABEL_POSITION.RIGHT,
    labelProps,
    ...otherProps
}) {
    const controlLabelClassName = classnames(
        "thc-c-control-label",
        {
            "thc-c-control-label--top": labelPosition === CONTROL_LABEL_POSITION.TOP,
            "thc-c-control-label--right": labelPosition === CONTROL_LABEL_POSITION.RIGHT,
            "thc-c-control-label--bottom": labelPosition === CONTROL_LABEL_POSITION.BOTTOM,
            "thc-c-control-label--left": labelPosition === CONTROL_LABEL_POSITION.LEFT,
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

ControlLabel.propTypes = {
    /**
     * Children element
     */
    children: PropTypes.element,
    /**
     * Additional className for control label
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * If has error
     */
    hasError: PropTypes.bool,
    /**
     * Identifier for input
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Label
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    /**
     * Additional className for label
     */
    labelClassName: PropTypes.string,
    /**
     * Position for label
     */
    labelPosition: PropTypes.oneOf(Object.values(CONTROL_LABEL_POSITION)),
    /**
     * Additional props for label
     */
    labelProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
