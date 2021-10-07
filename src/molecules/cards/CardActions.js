// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

export function CardActions({
    centered = false,
    children,
    className,
    actionsElementClassName: actionsElementClassNameProp,
    ...otherProps
}) {
    const actionsClassName = classnames(
        "thc-c-card__actions",
        { "thc-c-card__actions--centered": centered },
        className
    );
    const actionsElementClassName = classnames("thc-c-card__actions-element", actionsElementClassNameProp);

    const childrenAltered = alterElement(children, {
        className: classnames(actionsElementClassName),
    });

    return (
        <div {...otherProps} className={actionsClassName}>
            {childrenAltered}
        </div>
    );
}

CardActions.propTypes = {
    /**
     * If actions are centered
     */
    centered: PropTypes.bool,
    /**
     * Content of card
     */
    children: PropTypes.node,
    /**
     * Additional className for content
     */
    className: PropTypes.string,
    /**
     *  Additional className for the action elements
     */
    actionsElementClassName: PropTypes.string,
};
