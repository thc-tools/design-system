// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { wrapLabel } from "../../core/utils";

export interface CardContentProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for content
     */
    className?: string;
}

export function CardContent({ children, className, ...otherProps }: CardContentProps) {
    const contentClassName = classnames("thc-c-card__content", className);

    const wrappedChild = wrapLabel(children);

    return (
        <div className={contentClassName} {...otherProps}>
            {wrappedChild}
        </div>
    );
}
