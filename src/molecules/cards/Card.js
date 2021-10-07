// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapKeyUp, wrapPrevent } from "../../core/utils";

export const Card = React.forwardRef(function Card(
    {
        children,
        className,
        condensed = false,
        disabled = false,
        onClick,
        outlined = false,
        rectangular = false,
        tabIndex = 0,
        ...otherProps
    },
    ref
) {
    const cardClassName = classnames(
        "thc-o-box",
        "thc-o-paper",
        {
            "thc-o-actionable": !!onClick,
            "thc-o-paper--shadow": !!onClick && !outlined,
            "thc-o-box--outlined": outlined,
            "thc-o-box--rectangular": rectangular,
            "thc-c-card--elevated": !!onClick,
            "thc-c-card--condensed": condensed,
        },
        "thc-c-card",
        className
    );

    const handleOnClick = wrapPrevent(onClick);
    const handleKeyUp = wrapKeyUp(handleOnClick);

    return (
        <div
            {...otherProps}
            className={cardClassName}
            disabled={disabled === true}
            onClick={handleOnClick}
            onKeyUp={handleKeyUp}
            ref={ref}
            role="button"
            tabIndex={onClick ? tabIndex : undefined}
        >
            {children}
        </div>
    );
});

Card.propTypes = {
    /**
     * Content of card
     */
    children: PropTypes.node,
    /**
     * Additional className for card
     */
    className: PropTypes.string,
    /**
     * If is condensed
     */
    condensed: PropTypes.bool,
    /**
     * If is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * If is outlined
     */
    outlined: PropTypes.bool,
    /**
     * If Card is without radius
     */
    rectangular: PropTypes.bool,
    /**
     * Tab index for the card
     */
    tabIndex: PropTypes.number,
};
