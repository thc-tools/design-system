// Libs
import clsx from "clsx";

// Components
import { Icon, IconProps, IconSize, Icons } from "../icons";
import { Tooltip, TooltipProps } from "./Tooltip";

export interface IconTooltipProps extends TooltipProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Tooltip icon
     */
    icon?: Icons;
    /**
     * Additional Icon className
     */
    iconClassName?: string;
    /**
     * Additional iconProps
     */
    iconProps?: IconProps;
    /**
     * Icon size
     */
    iconSize?: IconSize;
    /**
     * Tooltip
     */
    tooltip?: React.ReactNode;
    /**
     * Tooltip title
     */
    tooltipTitle?: React.ReactNode;
}

export function IconTooltip({
    className,
    icon = "info",
    iconClassName = "ds-u-text--secondary",
    iconProps,
    iconSize = "s",
    tooltip,
    tooltipTitle,
    ...otherProps
}: IconTooltipProps): JSX.Element {
    const rootClassName = clsx("ds-c-icon-tooltip", className);

    return (
        <Tooltip {...otherProps} className={rootClassName} tooltip={tooltip} tooltipTitle={tooltipTitle}>
            <Icon {...iconProps} className={iconClassName} size={iconSize}>
                {icon}
            </Icon>
        </Tooltip>
    );
}
