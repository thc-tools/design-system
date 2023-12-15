// Libs
import clsx from "clsx";
import React from "react";

export interface LoaderContainerProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export function LoaderContainer({ children, className, ...otherProps }: LoaderContainerProps) {
    const rootClassName = clsx("ds-c-loader-container", className);

    return (
        <div {...otherProps} className={rootClassName}>
            {children}
        </div>
    );
}
