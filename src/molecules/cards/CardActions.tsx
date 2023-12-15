// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { alterElement } from "../../core/utils";

export interface CardActionsProps extends React.PropsWithChildren<unknown> {
    /**
     * If actions are centered
     */
    centered?: boolean;
    /**
     * Additional className for content
     */
    className?: string;
    /**
     *  Additional className for the action elements
     */
    actionsElementClassName?: string;
}

export function CardActions({
    centered = false,
    children,
    className,
    actionsElementClassName: actionsElementClassNameProp,
    ...otherProps
}: CardActionsProps) {
    const actionsClassName = clsx("ds-c-card__actions", { "ds-c-card__actions--centered": centered }, className);
    const actionsElementClassName = clsx("ds-c-card__actions-element", actionsElementClassNameProp);

    const childrenAltered = alterElement(children, {
        className: clsx(actionsElementClassName),
    });

    return (
        <div {...otherProps} className={actionsClassName}>
            {childrenAltered}
        </div>
    );
}
