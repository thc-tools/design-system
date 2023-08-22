// Libs
import classnames from "classnames";
import React from "react";

export interface ChipContainerProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for container
     */
    className?: string;
    /**
     * If is condensed
     */
    condensed?: boolean;
}

export function ChipContainer({ children, className, condensed = false, ...otherProps }: ChipContainerProps) {
    const containerClassName = classnames(
        "thc-c-chip-container",
        { "thc-c-chip-container__condensed": condensed },
        className
    );

    return (
        <div className={containerClassName} {...otherProps}>
            {children}
        </div>
    );
}
