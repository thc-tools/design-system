// Libs
import clsx from "clsx";
import React from "react";

export interface FormActionsProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export function FormActions({ children, className }: FormActionsProps) {
    const rootClassName = clsx("ds-c-form-actions", className);

    return <div className={rootClassName}>{children}</div>;
}
