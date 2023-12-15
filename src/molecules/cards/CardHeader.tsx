// Libs
import clsx from "clsx";
import React from "react";

export interface CardHeaderProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
    { children, className },
    ref
) {
    const rootClassName = clsx("ds-c-card__header", className);

    return (
        <div className={rootClassName} ref={ref}>
            {children}
        </div>
    );
});
