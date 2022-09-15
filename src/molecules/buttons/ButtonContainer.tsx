// Libs
import clsx from "clsx";
import React from "react";

export interface ButtonContainerProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export function ButtonContainer({ children, className }: ButtonContainerProps): JSX.Element {
    const rootClassName = clsx("ds-c-button-container", className);

    return <div className={rootClassName}>{children}</div>;
}
