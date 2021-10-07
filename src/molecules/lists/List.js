// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const List = React.forwardRef(function List({ children, className, hasSeparator = false, ...otherProps }, ref) {
    const listClassName = classnames("thc-c-list", { "thc-c-list--separator": hasSeparator }, className);

    return (
        <ul {...otherProps} className={listClassName} ref={ref}>
            {children}
        </ul>
    );
});

List.propTypes = {
    /**
     * Children
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If has separator
     */
    hasSeparator: PropTypes.bool,
};
