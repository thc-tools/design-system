// Libs
import clsx from "clsx";
import React from "react";

import { RTableCellProps } from "../../core/utils";

export interface CellProps extends React.PropsWithChildren<RTableCellProps> {
    /**
     * Align content
     */
    align?: "left" | "center" | "right";
    /**
     * Custom cell component
     */
    CellComponent?: React.ElementType;
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional container className
     */
    containerClassName?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Formatter to value
     */
    formatter?: (child: React.ReactNode) => React.ReactNode;
    /**
     * If is Hovered
     */
    hover?: boolean;
    /**
     * If no spacing is applied
     */
    noSpacing?: boolean;
    /**
     * Hover handler
     */
    onHover?: (hover: boolean) => void;
}

export const Cell = React.memo(function Cell({
    align = "left",
    CellComponent = "td",
    children,
    className,
    containerClassName: containerClassNameProp,
    formatter,
    noSpacing = false,
    ...otherProps
}: CellProps) {
    const rootClassName = clsx("ds-c-cell", `ds-c-cell--${align}`, { "ds-c-cell--spaced": !noSpacing }, className);
    const containerClassNAme = clsx("ds-c-cell__container", "ds-u-typography--body", containerClassNameProp);

    let child = children;
    if (formatter) {
        child = formatter(child);
    } else if (typeof children === "undefined" || children === null) {
        child = "";
    }

    return (
        <CellComponent {...otherProps} className={rootClassName}>
            <div className={containerClassNAme}>{child}</div>
        </CellComponent>
    );
});
