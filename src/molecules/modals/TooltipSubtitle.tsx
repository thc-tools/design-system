// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface TooltipSubtitleProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Typography className
     */
    typographyClassName?: string;
}

export function TooltipSubtitle({
    children,
    className: classNameProp,
    typographyClassName = "ds-u-typography--caption-medium ds-u-text--uppercase ds-u-text--secondary",
}: TooltipSubtitleProps): JSX.Element {
    const className = clsx("ds-c-tooltip__subtitle", typographyClassName, classNameProp);

    return <div className={className}>{children}</div>;
}
