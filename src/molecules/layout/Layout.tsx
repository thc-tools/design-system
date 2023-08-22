// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

export function Layout({ children, className, header, menu }) {
    const rootClassName = classnames("thc-c-layout", className);

    return (
        <div className={rootClassName}>
            {alterElement(menu, { className: "thc-c-layout__menu" })}
            {alterElement(header, { className: "thc-c-layout__header" })}
            <div className="thc-c-layout__page">{children}</div>
        </div>
    );
}

Layout.propTypes = {
    /**
     * Page to display
     */
    children: PropTypes.node,
    /**
     * Header to display
     */
    header: PropTypes.node,
    /**
     * Menu to display
     */
    menu: PropTypes.node,
};
