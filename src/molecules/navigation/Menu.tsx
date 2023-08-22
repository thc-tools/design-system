// Libs
import classnames from "classnames";
import React from "react";

export interface MenuProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for menu
     */
    className?: string;
}

export function Menu({ children, className, ...otherProps }: MenuProps) {
    const menuClassName = classnames("thc-o-paper", "thc-c-menu", className);

    return (
        <div {...otherProps} className={menuClassName}>
            {children}
        </div>
    );
}
