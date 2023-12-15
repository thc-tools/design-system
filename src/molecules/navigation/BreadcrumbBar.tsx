// Libs
import clsx from "clsx";
import React from "react";

// Components
import { Icon } from "../icons";

export interface BreadcrumbBarProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export function BreadcrumbBar({ children, className, ...otherProps }: BreadcrumbBarProps) {
    const rootClassName = clsx("ds-c-breadcrumb-bar", className);
    const childrenCount = React.Children.count(children);

    return (
        <div {...otherProps} className={rootClassName}>
            {React.Children.map(children, (child, i) => {
                if (i < childrenCount - 1) {
                    return (
                        <>
                            {child}
                            <Icon className="ds-c-breadcrumb-bar__separator">angle-right</Icon>
                        </>
                    );
                }

                return child;
            })}
        </div>
    );
}
