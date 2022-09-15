// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface TableHeaderProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export function TableHeader({ children, className: classNameProp }: TableHeaderProps): JSX.Element {
    const className = clsx("ds-c-table__header", classNameProp);

    return <thead className={className}>{children}</thead>;
}
