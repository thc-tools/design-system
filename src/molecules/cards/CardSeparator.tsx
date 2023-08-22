// Libs
import classnames from "classnames";
import React from "react";

export interface CardSeparatorProps extends React.PropsWithChildren<{}> {
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
    const separatorClassName = classnames(
        "thc-c-card__separator",
        { "thc-c-card__separator--full-width": fullWidth },
        className
    );

    return <div {...otherProps} className={separatorClassName} />;
}
