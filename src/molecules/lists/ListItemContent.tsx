// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { filterProps } from "../../core/utils";

export interface ListItemContentProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function ListItemContent({ children, className, onClick, ...otherProps }: ListItemContentProps) {
    const rootClassName = clsx("ds-c-list-item-content", className);

    return (
        <div className={rootClassName} onClick={onClick} {...filterProps(otherProps)}>
            {children}
        </div>
    );
}
