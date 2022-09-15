// Libs
import clsx from "clsx";
import React from "react";

// Components
import { Icon, IconProps, Icons, IconSize } from "../icons";

export interface ListItemIconProps extends React.PropsWithChildren<unknown> {
    /**
     * If is with accent color
     */
    accent?: boolean;
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is visible on hover
     */
    hover?: boolean;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Additional className for Icon
     */
    iconClassName?: string;
    /**
     * Additional props for Icon
     */
    iconProps?: IconProps;
    /**
     * Size for Icon
     */
    iconSize?: IconSize;
}

export function ListItemIcon({
    accent = false,
    children,
    className,
    hover = false,
    icon,
    iconClassName: iconClassNameProp,
    iconProps,
    iconSize = "m",
    ...otherProps
}: ListItemIconProps) {
    const rootClassName = clsx(
        "ds-c-list-item-icon",
        {
            "ds-c-list-item-icon--hover": hover,
            "ds-c-list-item-icon--accent": accent,
        },
        className
    );
    const iconClassName = clsx("ds-c-list-item-icon__icon", iconClassNameProp);

    return (
        <div {...otherProps} className={rootClassName}>
            <Icon {...iconProps} className={iconClassName} size={iconSize}>
                {icon ?? children}
            </Icon>
        </div>
    );
}
