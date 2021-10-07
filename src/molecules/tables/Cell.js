// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { useHover } from "../../core/hooks";

export const Cell = React.memo(function Cell({
    children,
    className,
    disabled = false,
    formatter,
    hover: hoverProp,
    onHover,
    ...otherProps
}) {
    const { hover, ...hoverEvents } = useHover(disabled, onHover);

    const rootClassName = classnames("thc-c-cell", { "thc-c-cell--hover": hover || hoverProp }, className);

    let child = children;
    if (formatter) {
        child = formatter(child);
    } else if (typeof children === "undefined" || children === null) {
        child = "";
    }

    return (
        <div {...otherProps} {...hoverEvents} className={rootClassName}>
            {child}
        </div>
    );
});

Cell.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * If is Hovered
     */
    hover: PropTypes.bool,
    /**
     * Hover handler
     */
    onHover: PropTypes.func,
};
