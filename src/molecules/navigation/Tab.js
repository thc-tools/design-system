// Libs
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapLabel } from "../../core/utils";

// Components
import { Button } from "../buttons";
import { IconWrapper } from "../icons";

export function Tab({
    children,
    className,
    disabled = false,
    icon,
    iconClassName: iconClassNameProp,
    iconPosition,
    iconProps,
    iconSize,
    indicator,
    label,
    onChange,
    onClick,
    selected,
    value,
    ...otherProps
}) {
    const rootClassName = classnames(
        "thc-c-tab",
        {
            "thc-c-tab--disabled": disabled,
            "thc-c-tab--selected": selected,
        },
        className
    );
    const iconClassName = classnames("thc-c-tab__icon", iconClassNameProp);

    const handleClick = useCallback(
        (event) => {
            if (!selected && onChange) {
                onChange(value, event);
            }

            if (onClick) {
                onClick(event);
            }
        },
        [selected, onChange, onClick, value]
    );

    const child = wrapLabel(label ?? children);

    return (
        <Button {...otherProps} className={rootClassName} disabled={disabled} onClick={handleClick} type="tab">
            <span className="thc-c-tab__wrapper">
                <IconWrapper
                    {...iconProps}
                    className={iconClassName}
                    icon={icon}
                    position={iconPosition}
                    size={iconSize}
                >
                    {child}
                </IconWrapper>
            </span>
            {indicator}
        </Button>
    );
}

Tab.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Icon
     */
    icon: PropTypes.string,
    /**
     * Additional className for Icon
     */
    iconClassName: PropTypes.string,
    /**
     * Position for Icon
     */
    iconPosition: IconWrapper.propTypes.position,
    /**
     * Additional prop for Icon
     */
    iconProps: PropTypes.shape(IconWrapper.propTypes),
    /**
     * Size for Icon
     */
    iconSize: IconWrapper.propTypes.size,
    /**
     * Indicator
     */
    indicator: PropTypes.node,
    /**
     * Label
     */
    label: PropTypes.string,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * If is selected
     */
    selected: PropTypes.bool,
    /**
     * Value
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
