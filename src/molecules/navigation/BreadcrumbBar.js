// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Icon } from "../icons";

export function BreadcrumbBar({ children, className, ...otherProps }) {
    const rootClassName = classnames("thc-c-breadcrumb-bar", className);
    const childrenCount = React.Children.count(children);

    return (
        <div {...otherProps} className={rootClassName}>
            {React.Children.map(children, (child, i) => {
                if (i < childrenCount - 1) {
                    return (
                        <>
                            {child}
                            <Icon className="thc-c-breadcrumb-bar__separator">angle-right</Icon>
                        </>
                    );
                }

                return child;
            })}
        </div>
    );
}

BreadcrumbBar.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
};
