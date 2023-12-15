// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface TableFooterProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
}

export function TableFooter({ children, className: classNameProp }: TableFooterProps): JSX.Element {
    const className = clsx("ds-c-table__footer", classNameProp);

    return <tfoot className={className}>{children}</tfoot>;
}
