// Libs
import classnames from "classnames";
import React from "react";

export interface FormActionsProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
}

export function FormActions({ children, className }: FormActionsProps) {
    const rootClassName = classnames("thc-c-form-actions", className);

    return <div className={rootClassName}>{children}</div>;
}
