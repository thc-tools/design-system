// Libs
import classnames from "classnames";
import React from "react";

export interface LoaderContainerProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
}

export function LoaderContainer({ children, className, ...otherProps }: LoaderContainerProps) {
    const rootClassName = classnames("thc-c-loader-container", className);

    return (
        <div {...otherProps} className={rootClassName}>
            {children}
        </div>
    );
}
