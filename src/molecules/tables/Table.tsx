// Libs
import clsx from "clsx";
import React from "react";
import { RTableProps } from "src/design-system/core/utils";

// Components

export interface TableProps extends React.PropsWithChildren<Omit<RTableProps, "ref">> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Has full width
     */
    fullWidth?: boolean;
    /**
     * Max height
     */
    maxHeight?: number;
    /**
     * Width
     */
    width?: number;
}

export const Table = React.forwardRef<HTMLDivElement, TableProps>(function Table(
    { children, className: classNameProp, fullWidth = true, maxHeight, width, ...otherProps },
    ref
) {
    const className = clsx(
        "ds-c-table",
        {
            "ds-c-table--full-width": fullWidth,
        },
        classNameProp
    );

    return (
        <div
            className={className}
            style={{
                maxHeight: maxHeight,
                width: width !== undefined ? width : undefined,
            }}
            ref={ref}
        >
            <table className="ds-c-table__container" {...otherProps}>
                {children}
            </table>
        </div>
    );
});
