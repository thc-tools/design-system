// Libs
import clsx from "clsx";
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

    const rootClassName = clsx(
        { "ds-o-actionable": !active },
        "ds-c-breadcrumb",
        { "ds-c-breadcrumb--active": active },
        className
    );
    const iconClassName = clsx("ds-c-breadcrumb__icon", iconClassNameProp);

    const ContainerComponent: any = !to || active ? "div" : Link;

    return (
        <ContainerComponent {...otherProps} className={rootClassName} to={to}>
            {icon && (
                <Icon {...iconProps} className={iconClassName}>
                    {icon}
                </Icon>
            )}
            {(concept || name) && (
                <div className="ds-c-breadcrumb__label">
                    <div className="ds-c-breadcrumb__concept ds-u-text--label">{concept}</div>
                    <div className="ds-c-breadcrumb__name ds-u-text--subtitle-bold">{name}</div>
                </div>
            )}
        </ContainerComponent>
    );
}
