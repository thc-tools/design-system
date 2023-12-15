// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface TableBodyProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export function TableBody({ children, className: classNameProp }: TableBodyProps): JSX.Element {
    const className = clsx("ds-c-table__body", classNameProp);

    return <tbody className={className}>{children}</tbody>;
}
