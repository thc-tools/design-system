// Libs
import classnames from "classnames";
import React from "react";
import { Link, LinkProps, matchPath, useLocation } from "react-router-dom";

// Utils
import { arrayify, isReactElement, wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { Icon, Icons } from "../icons";
import { Tooltip, TooltipProps } from "../modals";

export interface MenuItemProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for menu item
     */
    className?: string;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Label
     */
    label?: string;
    /**
     * Additional className for link
     */
    linkClassName?: string;
    /**
     * Additional props for link
     */
    linkProps?: LinkProps;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * Path to redirection
     */
    to: string | string[];
    /**
     * Additional tooltip
     */
    tooltip?: React.ReactNode;
    /**
     * Additional className for tooltip
     */
    tooltipClassName?: string;
    /**
     * Additional props for tooltip
     */
    tooltipProps?: TooltipProps;
}

export function MenuItem({
    children,
    className,
    icon,
    label,
    linkClassName: linkClassNameProp,
    linkProps,
    onClick,
    to: toProp,
    tooltip,
    tooltipClassName,
    tooltipProps,
    ...otherProps
}: MenuItemProps) {
    const toList = arrayify(toProp);
    const location = useLocation();
    const matches = toList.map((to) => matchPath(location.pathname, to));
    const active = toList.length > 0 && matches.some(Boolean);

    const itemClassName = classnames("thc-c-menu-item", { "thc-c-menu-item--active": active }, className);
    const linkClassName = classnames("thc-c-menu-item__link", linkClassNameProp);

    let child;
    if (children) {
        child = isReactElement(children) ? React.cloneElement(children, { active }) : null;
    } else if (label && icon) {
        child = <MenuItemIconLabel active={active} icon={icon} label={label} />;
    } else if (icon) {
        child = (
            <MenuItemIcon
                active={active}
                icon={icon}
                tooltip={tooltip}
                tooltipClassName={tooltipClassName}
                tooltipProps={tooltipProps}
            />
        );
    }

    if (onClick) {
        const handleOnClick = wrapPrevent(onClick);
        const handleKeyUp = wrapKeyUp(handleOnClick);

        child = (
            <div className={linkClassName} onClick={handleOnClick} onKeyUp={handleKeyUp} role="button" tabIndex={0}>
                {child}
            </div>
        );
    } else if (toList.length > 0) {
        child = (
            <Link {...linkProps} className={linkClassName} to={toList[0]}>
                {child}
            </Link>
        );
    }

    return (
        <li {...otherProps} className={itemClassName}>
            {child}
        </li>
    );
}

interface MenuItemIconLabelProps {
    /**
     * If is active
     */
    active?: boolean;
    /**
     * Additional className for menu item icon label
     */
    className?: string;
    /**
     * Icon to display
     */
    icon?: Icons;
    /**
     * Label to display
     */
    label?: string;
}

function MenuItemIconLabel({ active, className, icon, label, ...otherProps }: MenuItemIconLabelProps) {
    const itemClassName = classnames(
        { "thc-theme--color": active },
        "thc-o-actionable",
        "thc-c-menu-item-icon-label",
        className
    );
    const iconClassName = classnames("thc-c-menu-item-icon-label__icon");
    const labelClassName = classnames("thc-c-menu-item-icon-label__label", "thc-u-text--subnormal");

    return (
        <div {...otherProps} className={itemClassName}>
            <Icon className={iconClassName}>{icon}</Icon>
            <span className={labelClassName}>{label}</span>
        </div>
    );
}

interface MenuItemIconProps {
    /**
     * If is active
     */
    active?: boolean;
    /**
     * Additional className for menu item icon
     */
    className?: string;
    /**
     * Icon to display
     */
    icon?: Icons;
    /**
     * Additional tooltip
     */
    tooltip?: React.ReactNode;
    /**
     * Additional className for tooltip
     */
    tooltipClassName?: string;
    /**
     * Additional props for tooltip
     */
    tooltipProps?: TooltipProps;
}

function MenuItemIcon({
    active,
    className,
    icon,
    tooltip,
    tooltipClassName: tooltipClassNameProp,
    tooltipProps,
    ...otherProps
}: MenuItemIconProps) {
    const itemClassName = classnames(
        { "thc-theme--color": active },
        "thc-o-actionable",
        "thc-c-menu-item-icon",
        className
    );
    const iconClassName = classnames("thc-c-menu-item-icon__icon");
    const tooltipClassName = classnames("thc-c-menu-item-icon__tooltip", tooltipClassNameProp);

    return (
        <Tooltip {...tooltipProps} className={tooltipClassName} placement="right" tooltip={tooltip}>
            <div {...otherProps} className={itemClassName}>
                <Icon className={iconClassName}>{icon}</Icon>
            </div>
        </Tooltip>
    );
}
