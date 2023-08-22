// Libs
import classnames from "classnames";
import React from "react";

export interface ButtonContainerProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
}

export function ButtonContainer({ children, className }: ButtonContainerProps) {
    const rootClassName = classnames("thc-c-button-container", className);

    return <div className={rootClassName}>{children}</div>;
}
