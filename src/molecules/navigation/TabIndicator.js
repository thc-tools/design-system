// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function TabIndicator({ className, ...otherProps }) {
    const rootClassName = classnames("thc-c-tab-indicator", className);

    return <span {...otherProps} className={rootClassName} />;
}

TabIndicator.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
};
