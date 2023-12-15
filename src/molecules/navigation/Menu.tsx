// Libs
import clsx from "clsx";
import React from "react";
import { RDivProps } from "src/design-system/core/utils";

export interface MenuProps extends React.PropsWithChildren<RDivProps> {
    /**
     * Additional className for menu
     */
    className?: string;
}

export function Menu({ children, className, ...otherProps }: MenuProps) {
    const menuClassName = clsx("ds-o-paper", "ds-c-menu", className);

    return (
        <div {...otherProps} className={menuClassName}>
            {children}
        </div>
    );
}
