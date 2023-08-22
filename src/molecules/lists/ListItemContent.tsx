// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { filterProps } from "../../core/utils";

export interface ListItemContentProps extends React.PropsWithChildren<{}> {
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
    const rootClassName = classnames("thc-c-list-item-content", className);

    return (
        <div className={rootClassName} onClick={onClick} {...filterProps(otherProps)}>
            {children}
        </div>
    );
}
