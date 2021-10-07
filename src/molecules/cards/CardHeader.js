// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const CardHeader = React.forwardRef(function CardHeader({ children, className }, ref) {
    const rootClassName = classnames("thc-c-card__header", className);

    return (
        <div className={rootClassName} ref={ref}>
            {children}
        </div>
    );
});

CardHeader.propTypes = {
    /**
     * Children
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
};
