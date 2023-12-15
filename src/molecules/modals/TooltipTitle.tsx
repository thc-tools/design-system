// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface TooltipTitleProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Typography className
     */
    typographyClassName?: string;
}

export function TooltipTitle({
    children,
    className: classNameProp,
    typographyClassName = "ds-u-typography--subtitle-medium",
}: TooltipTitleProps): JSX.Element {
    const className = clsx("ds-c-tooltip__title", typographyClassName, classNameProp);

    return <div className={className}>{children}</div>;
}
