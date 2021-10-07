// Libs
import React from "react";
import classnames from "classnames";
import { Link, matchPath, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Utils
import { arrayify, wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { Icon } from "../icons";
import { Tooltip } from "../modals";

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
}) {
    const toList = arrayify(toProp);
    const location = useLocation();
    const matches = toList.map((to) => matchPath(location.pathname, to));
    const active = toList.length > 0 && matches.some(Boolean);

    const itemClassName = classnames("thc-c-menu-item", { "thc-c-menu-item--active": active }, className);
    const linkClassName = classnames("thc-c-menu-item__link", linkClassNameProp);

    let child;
    if (children) {
        child = React.cloneElement(children, { active });
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

MenuItem.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for menu item
     */
    className: PropTypes.string,
    /**
     * Icon
     */
    icon: PropTypes.string,
    /**
     * Label
     */
    label: PropTypes.string,
    /**
     * Additional className for link
     */
    linkClassName: PropTypes.string,
    /**
     * Additional props for link
     */
    linkProps: PropTypes.string,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * Path to redirection
     */
    to: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    /**
     * Additional tooltip
     */
    tooltip: PropTypes.node,
    /**
     * Additional className for tooltip
     */
    tooltipClassName: PropTypes.string,
    /**
     * Additional props for tooltip
     */
    tooltipProps: PropTypes.shape(Tooltip.propTypes),
};

function MenuItemIconLabel({ active, className, icon, label, ...otherProps }) {
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

MenuItemIconLabel.propTypes = {
    /**
     * If is active
     */
    active: PropTypes.bool,
    /**
     * Additional className for menu item icon label
     */
    className: PropTypes.string,
    /**
     * Icon to display
     */
    icon: PropTypes.string,
    /**
     * Label to display
     */
    label: PropTypes.string,
};

function MenuItemIcon({
    active,
    className,
    icon,
    tooltip,
    tooltipClassName: tooltipClassNameProp,
    tooltipProps,
    ...otherProps
}) {
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

MenuItemIcon.propTypes = {
    /**
     * If is active
     */
    active: PropTypes.bool,
    /**
     * Additional className for menu item icon
     */
    className: PropTypes.string,
    /**
     * Icon to display
     */
    icon: PropTypes.string,
    /**
     * Additional tooltip
     */
    tooltip: PropTypes.node,
    /**
     * Additional className for tooltip
     */
    tooltipClassName: PropTypes.string,
    /**
     * Additional props for tooltip
     */
    tooltipProps: PropTypes.shape(Tooltip.propTypes),
};
