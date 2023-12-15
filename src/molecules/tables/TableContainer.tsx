// Libs
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { useResizeAware } from "src/design-system/core/hooks";
import { RDivProps, alterElement } from "src/design-system/core/utils";

// Components

export interface TableContainerProps extends React.PropsWithChildren<RDivProps> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If has borderless render
     */
    hasBorderLess?: boolean;
    /**
     * If has sticky header & footer
     */
    hasSticky?: boolean;
    /**
     * Dummy prop
     */
    length?: number;
}

export function TableContainer({
    children: childrenProp,
    className: classNameProp,
    hasBorderLess = false,
    hasSticky = false,
    ...otherProps
}: TableContainerProps): JSX.Element {
    const [resizeListener, sizes] = useResizeAware();
    const tablePaginationRef = useRef<HTMLDivElement>();
    const tableRef = useRef<HTMLDivElement>();
    const containerRef = useRef<HTMLDivElement>();
    const [topPaginationPosition, setTopPaginationPosition] = React.useState(0);

    const className = clsx(
        "ds-c-table__outside-container",
        {
            "ds-c-table__outside-container--sticky": hasSticky,
            "ds-c-table__outside-container--borderless": hasBorderLess,
        },
        classNameProp
    );

    useEffect(() => {
        if ((tableRef.current?.getBoundingClientRect().height ?? 0) !== topPaginationPosition) {
            setTopPaginationPosition(tableRef.current?.getBoundingClientRect().height ?? 0);
        }
    }, [containerRef.current?.getBoundingClientRect(), tableRef.current?.getBoundingClientRect()]);

    const children = React.Children.toArray(childrenProp);
    const [tableChildren, paginationChildren] = children;

    return (
        <div className={className} {...otherProps} ref={containerRef}>
            {hasSticky && resizeListener}
            {alterElement(tableChildren, {
                maxHeight: hasSticky
                    ? (containerRef.current?.getBoundingClientRect().height ?? 0) -
                      (tablePaginationRef.current?.getBoundingClientRect().height ?? 0)
                    : undefined,
                width: hasSticky ? sizes.width : undefined,
                ref: tableRef,
            })}
            {alterElement(paginationChildren, {
                ref: tablePaginationRef,
                top: topPaginationPosition,
            })}
        </div>
    );
}
