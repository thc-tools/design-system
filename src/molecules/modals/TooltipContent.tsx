// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface TooltipContentProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Typography className
     */
    typographyClassName?: string;
}

export function TooltipContent({
    children,
    className: classNameProp,
    typographyClassName = "ds-u-typography--body",
}: TooltipContentProps): JSX.Element {
    const className = clsx("ds-c-tooltip__content", typographyClassName, classNameProp);

    return <div className={className}>{children}</div>;
}
