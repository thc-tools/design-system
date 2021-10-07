// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const CARD_CONTAINER_ORIENTATION = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
};

export const CardContainer = React.forwardRef(function CardContainer(
    {
        children,
        className,
        condensed = false,
        fullHeight = false,
        fullWidth = false,
        orientation = CARD_CONTAINER_ORIENTATION.VERTICAL,
        ...otherProps
    },
    ref
) {
    const rootClassName = classnames(
        "thc-c-card-container",
        {
            "thc-c-card-container--condensed": condensed,
            "thc-c-card-container--horizontal": orientation === CARD_CONTAINER_ORIENTATION.HORIZONTAL,
            "thc-c-card-container--vertical": orientation === CARD_CONTAINER_ORIENTATION.VERTICAL,
            "thc-c-card-container--full-height": fullHeight,
            "thc-c-card-container--full-width": fullWidth,
        },
        className
    );

    return (
        <div {...otherProps} className={rootClassName} ref={ref}>
            {children}
        </div>
    );
});

CardContainer.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is condensed
     */
    condensed: PropTypes.bool,
    /**
     * If is full height
     */
    fullHeight: PropTypes.bool,
    /**
     * If is full width
     */
    fullWidth: PropTypes.bool,
    /**
     * Orientation for container
     */
    orientation: PropTypes.oneOf(Object.values(CARD_CONTAINER_ORIENTATION)),
};
