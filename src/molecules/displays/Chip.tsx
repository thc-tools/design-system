// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { getCSSVariable, wrapLabel, wrapPrevent } from "../../core/utils";

// Components
import { IconPosition, IconSize, IconWrapper, IconWrapperProps } from "../icons";
import { Tooltip, TooltipProps } from "../modals";

export type ChipTypes = "colored" | "outlined" | "action";

export interface ChipProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for the chip
     */
    className?: string;
    /**
     * Color of the chip, css variable or color code
     */
    color?: string | null;
    /**
     * If chip is disabled
     */
    disabled?: boolean;
    /**
     * Helper text
     */
    helperText?: string;
    /**
     * Helper additional props
     */
    helperProps?: TooltipProps;
    /**
     * Icon to display
     */
    icon?: IconWrapperProps["icon"];
    /**
     * Additional className for icon
     */
    iconClassName?: string;
    /**
     * Icon position
     */
    iconPosition?: IconPosition;
    /**
     * Additional props for icon
     */
    iconProps?: IconWrapperProps;
    /**
     * Icon size
     */
    iconSize?: IconSize;
    /**
     * Label of the chip
     */
    label: string;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    /**
     * Type of chip
     */
    type?: ChipTypes;
}

export function Chip({
    children,
    className,
    color: colorProp = "--thc-color--blue-100",
    disabled = false,
    helperText,
    helperProps,
    icon,
    iconClassName: iconClassNameProp,
    iconPosition = "right",
    iconProps,
    iconSize = "xs",
    label,
    onClick,
    type = "colored",
    ...otherProps
}: ChipProps) {
    const chipClassName = classnames(
        {
            "thc-theme--color": !disabled && type === "colored",
        },
        "thc-c-chip",
        {
            "thc-c-chip--outlined": type === "outlined",
            "thc-o-actionable": !disabled && !!onClick,
        },
        className
    );
    const iconClassName = classnames("thc-c-chip__icon", iconClassNameProp);

    let color = disabled || type === "outlined" ? undefined : colorProp;
    if (color && color.startsWith("--thc")) {
        color = getCSSVariable(colorProp);
    }

    const child = wrapLabel(label ?? children);

    const handleClick = wrapPrevent(onClick, disabled);

    return (
        <div className={chipClassName} disabled={disabled === true} style={{ backgroundColor: color }} {...otherProps}>
            <Tooltip disabled={!helperText} tooltip={helperText} {...helperProps} placement={TOOLTIP_PLACEMENT.TOP}>
                <IconWrapper
                    {...iconProps}
                    className={iconClassName}
                    icon={icon}
                    onClick={handleClick}
                    position={iconPosition}
                    size={iconSize}
                >
                    {child}
                </IconWrapper>
            </Tooltip>
        </div>
    );
}
