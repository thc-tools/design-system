// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

export interface MenuListProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className for list
     */
    className?: string;
}

export function MenuList({ children, className, ...otherProps }: MenuListProps) {
    const listClassName = clsx("ds-c-menu-list", className);
    const menuItemClassName = clsx("ds-c-menu-list__item");

    return (
        <ul {...otherProps} className={listClassName}>
            {alterElement(children, { className: menuItemClassName })}
        </ul>
    );
}
