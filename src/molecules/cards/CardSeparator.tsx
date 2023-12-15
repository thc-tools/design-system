// Libs
import clsx from "clsx";
import React from "react";

export interface CardSeparatorProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If separator is full width
     */
    fullWidth?: boolean;
}

export function CardSeparator({ className, fullWidth = false, ...otherProps }: CardSeparatorProps) {
    const separatorClassName = clsx(
        "ds-c-card__separator",
        { "ds-c-card__separator--full-width": fullWidth },
        className
    );

    return <div {...otherProps} className={separatorClassName} />;
}
