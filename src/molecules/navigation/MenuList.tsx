// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

export interface MenuListProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for list
     */
    className?: string;
}

export function MenuList({ children, className, ...otherProps }: MenuListProps) {
    const listClassName = classnames("thc-c-menu-list", className);
    const menuItemClassName = classnames("thc-c-menu-list__item");

    return (
        <ul {...otherProps} className={listClassName}>
            {alterElement(children, { className: menuItemClassName })}
        </ul>
    );
}
