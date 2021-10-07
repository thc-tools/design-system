// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link, useRouteMatch } from "react-router-dom";

// Components
import { Icon } from "../icons";

export function Breadcrumb({
    active: activeProp,
    className,
    concept,
    icon,
    iconClassName: iconClassNameProp,
    iconProps,
    name,
    to: toProp,
    ...otherProps
}) {
    const to = toProp?.includes("?") ? toProp.slice(0, toProp.indexOf("?")) : toProp;
    const active = activeProp ?? useRouteMatch({ path: to, exact: true });

    const rootClassName = classnames(
        { "thc-o-actionable": !active },
        "thc-c-breadcrumb",
        { "thc-c-breadcrumb--active": active },
        className
    );
    const iconClassName = classnames("thc-c-breadcrumb__icon", iconClassNameProp);

    const ContainerComponent = !to || active ? "div" : Link;

    return (
        <ContainerComponent {...otherProps} className={rootClassName} to={to}>
            {icon && (
                <Icon {...iconProps} className={iconClassName}>
                    {icon}
                </Icon>
            )}
            {(concept || name) && (
                <div className="thc-c-breadcrumb__label">
                    <div className="thc-c-breadcrumb__concept thc-u-text--label">{concept}</div>
                    <div className="thc-c-breadcrumb__name thc-u-text--subtitle-bold">{name}</div>
                </div>
            )}
        </ContainerComponent>
    );
}

Breadcrumb.propTypes = {
    /**
     * If is active (detected automatically via react-router)
     */
    active: PropTypes.bool,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Concept name
     */
    concept: PropTypes.string,
    /**
     * Icon
     */
    icon: PropTypes.string,
    /**
     * Additional className for Icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for Icon
     */
    iconProps: PropTypes.shape(Icon.propTypes),
    /**
     * Name
     */
    name: PropTypes.string,
    /**
     * Redirection path
     */
    to: PropTypes.string,
};
