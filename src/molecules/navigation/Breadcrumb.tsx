// Libs
import classnames from "classnames";
import { Link, useRouteMatch } from "react-router-dom";

// Components
import { Icon, IconProps, Icons } from "../icons";

export interface BreadcrumbProps {
    /**
     * If is active (detected automatically via react-router)
     */
    active?: boolean;
    /**
     * Additional className
     */
    className?: string;
    /**
     * Concept name
     */
    concept?: string;
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
     * Name
     */
    name?: string;
    /**
     * Redirection path
     */
    to: string;
}

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
}: BreadcrumbProps) {
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
