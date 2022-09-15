// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface TableRowProps
    extends React.PropsWithChildren<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
    > {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If row is focused
     */
    isFocused?: boolean;
}

export function TableRow({
    children,
    className: classNameProp,
    isFocused = false,
    onClick,
    ...otherProps
}: TableRowProps): JSX.Element {
    const className = clsx(
        "ds-c-table__row",
        {
            "ds-c-table__row--focused": isFocused,
            "ds-c-table__row--actionnable": !!onClick,
        },
        classNameProp
    );

    return (
        <tr className={className} onClick={onClick} {...otherProps}>
            {children}
        </tr>
    );
}
