// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { Icon, IconProps, IconSize, Icons } from "./Icon";

export type IconPosition = "top" | "right" | "bottom" | "left";

export interface IconWrapperProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is condensed
     */
    condensed?: boolean;
    /**
     * Icon
     */
    icon: Icons | React.ReactNode;
    /**
     * Additional className for Icon
     */
    iconClassName?: string;
    /**
     * Additional props for Icon
     */
    iconProps?: IconProps;
    /**
     * If is full width
     */
    hasFullWidth?: boolean;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    /**
     * Position for icon
     */
    position?: IconPosition;
    /**
     * Size for icon
     */
    size?: IconSize;
}

export const IconWrapper = React.forwardRef<HTMLDivElement, IconWrapperProps>(function IconWrapper(
    {
        children,
        className,
        condensed = false,
        icon,
        iconClassName: iconClassNameProp,
        iconProps = {},
        hasFullWidth = false,
        onClick,
        position = "left",
        size,
        ...otherProps
    },
    ref
) {
    const rootClassName = clsx(
        "ds-c-icon-wrapper",
        {
            "ds-c-icon-wrapper--condensed": condensed,
            "ds-c-icon-wrapper--full-width": hasFullWidth,
            "ds-c-icon-wrapper--top": position === "top",
            "ds-c-icon-wrapper--right": position === "right",
            "ds-c-icon-wrapper--bottom": position === "bottom",
            "ds-c-icon-wrapper--left": position === "left",
        },
        className
    );
    const iconClassName = clsx("ds-c-icon-wrapper__icon", iconClassNameProp, iconProps.className);

    return (
        <div {...otherProps} className={rootClassName} ref={ref}>
            {alterElement(children, { className: "ds-c-icon-wrapper__content" })}
            {icon && (
                <Icon {...iconProps} className={iconClassName} onClick={onClick} size={size}>
                    {icon}
                </Icon>
            )}
        </div>
    );
});
