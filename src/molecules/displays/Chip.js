// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { getCSSVariable, wrapLabel } from "../../core/utils";

// Components
import { IconWrapper, ICON_SIZE, ICON_POSITION } from "../icons";
import { Tooltip, TOOLTIP_PLACEMENT } from "../modals";

export { ICON_SIZE as CHIP_ICON_SIZE, ICON_POSITION as CHIP_ICON_POSITION };

export const CHIP_TYPES = {
    COLORED: "colored",
    OUTLINED: "outlined",
    ACTION: "action",
};

export function Chip({
    children,
    className,
    color: colorProp = "--thc-color--blue-100",
    disabled = false,
    helperText,
    helperProps,
    icon,
    iconClassName: iconClassNameProp,
    iconPosition = ICON_POSITION.RIGHT,
    iconProps,
    iconSize = ICON_SIZE.XS,
    label,
    onClick,
    type = CHIP_TYPES.COLORED,
    ...otherProps
}) {
    const chipClassName = classnames(
        {
            "thc-theme--color": !disabled && type === CHIP_TYPES.COLORED,
        },
        "thc-c-chip",
        {
            "thc-c-chip--outlined": type === CHIP_TYPES.OUTLINED,
            "thc-o-actionable": !!onClick,
        },
        className
    );
    const iconClassName = classnames("thc-c-chip__icon", iconClassNameProp);

    let color = disabled || type === CHIP_TYPES.OUTLINED ? undefined : colorProp;
    if (color && color.startsWith("--thc")) {
        color = getCSSVariable(colorProp);
    }

    const child = wrapLabel(label ?? children);

    return (
        <div className={chipClassName} disabled={disabled === true} style={{ backgroundColor: color }} {...otherProps}>
            <Tooltip disabled={!helperText} tooltip={helperText} {...helperProps} placement={TOOLTIP_PLACEMENT.TOP}>
                <IconWrapper
                    {...iconProps}
                    className={iconClassName}
                    icon={icon}
                    onClick={!disabled ? onClick : undefined}
                    position={iconPosition}
                    size={iconSize}
                >
                    {child}
                </IconWrapper>
            </Tooltip>
        </div>
    );
}

Chip.propTypes = {
    /**
     * Content of the chip (overridden with label)
     */
    children: PropTypes.node,
    /**
     * Additional className for the chip
     */
    className: PropTypes.string,
    /**
     * Color of the chip, css variable or color code
     */
    color: PropTypes.string,
    /**
     * If chip is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Helper text
     */
    helperText: PropTypes.string,
    /**
     * Helper additional props
     */
    helperProps: PropTypes.shape(Tooltip.propTypes),
    /**
     * Icon to display
     */
    icon: IconWrapper.propTypes.icon,
    /**
     * Additional className for icon
     */
    iconClassName: PropTypes.string,
    /**
     * Icon position
     */
    iconPosition: IconWrapper.propTypes.position,
    /**
     * Additional props for icon
     */
    iconProps: PropTypes.shape(IconWrapper.propTypes),
    /**
     * Icon size
     */
    iconSize: IconWrapper.propTypes.size,
    /**
     * Label of the chip
     */
    label: PropTypes.string,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Type of chip
     */
    type: PropTypes.oneOf(Object.values(CHIP_TYPES)),
};
