// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { getCSSVariable, wrapLabel, wrapPrevent } from "../../core/utils";

// Components
import { IconPosition, IconSize, IconWrapper, IconWrapperProps } from "../icons";
import { Tooltip, TooltipProps } from "../modals";

export type ChipTypes = "colored" | "outlined" | "action";

export type ChipVariant = "primary" | "secondary" | "info" | "success" | "error" | "warning" | "purple";

export interface ChipProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className for the chip
     */
    className?: string;
    /**
     * Color of the chip, css variable or color code
     */
    color?: string | null;
    /**
     * If is condensed
     */
    condensed?: boolean;
    /**
     * Additional content className
     */
    contentClassName?: string;
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
    label?: string;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    /**
     * Type of chip
     */
    type?: ChipTypes;
    /**
     * Typography className
     */
    typographyClassName?: string;
    /**
     * Variant of chip
     */
    variant?: ChipVariant;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(function Chip(
    {
        children,
        className,
        color: colorProp = "--ds-color--primary-500",
        condensed = false,
        contentClassName,
        disabled = false,
        helperText,
        helperProps,
        icon,
        iconClassName: iconClassNameProp,
        iconPosition = "left",
        iconProps,
        iconSize = "s",
        label,
        onClick,
        type = "colored",
        typographyClassName = "ds-u-typography--body-medium",
        variant,
        ...otherProps
    },
    ref
): JSX.Element {
    const chipClassName = clsx(
        {
            "ds-theme--color": !disabled && type === "colored" && !variant,
        },
        "ds-c-chip",
        {
            "ds-c-chip--outlined": type === "outlined",
            [`ds-c-chip--${variant}`]: !!variant,
            "ds-c-chip--variation": !!variant,
            "ds-c-chip--condensed": condensed,
            "ds-o-actionable": !!onClick,
        },
        "ds-u-typography--body",
        className
    );
    const iconClassName = clsx("ds-c-chip__icon", iconClassNameProp);
    let color = (disabled || type === "outlined" || !!variant ? undefined : colorProp) ?? undefined;
    if (color && color.startsWith("--ds")) {
        color = getCSSVariable(color);
    }

    const child = wrapLabel(label ?? children, contentClassName);

    const handleClick = wrapPrevent(onClick, disabled);

    return (
        <div
            className={chipClassName}
            disabled={disabled === true}
            style={{ backgroundColor: color }}
            {...otherProps}
            ref={ref}
        >
            <Tooltip disabled={!helperText} tooltip={helperText} {...helperProps} placement="top">
                <IconWrapper
                    {...iconProps}
                    className={iconClassName}
                    condensed
                    icon={icon}
                    onClick={handleClick}
                    position={iconPosition}
                    size={iconSize}
                >
                    {wrapLabel(child, typographyClassName)}
                </IconWrapper>
            </Tooltip>
        </div>
    );
});
