// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

export function MenuList({ children, className, ...otherProps }) {
    const listClassName = classnames("thc-c-menu-list", className);
    const menuItemClassName = classnames("thc-c-menu-list__item");

    return (
        <ul {...otherProps} className={listClassName}>
            {alterElement(children, { className: menuItemClassName })}
        </ul>
    );
}

MenuList.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for list
     */
    className: PropTypes.string,
};
