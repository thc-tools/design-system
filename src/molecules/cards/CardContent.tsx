// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { wrapLabel } from "../../core/utils";

export interface CardContentProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className for content
     */
    className?: string;
}

export function CardContent({ children, className, ...otherProps }: CardContentProps) {
    const contentClassName = clsx("ds-c-card__content", className);

    const wrappedChild = wrapLabel(children);

    return (
        <div className={contentClassName} {...otherProps}>
            {wrappedChild}
        </div>
    );
}
