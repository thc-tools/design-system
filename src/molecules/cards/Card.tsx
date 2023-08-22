// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { wrapKeyUp, wrapPrevent } from "../../core/utils";

export interface CardProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for card
     */
    className?: string;
    /**
     * If is condensed
     */
    condensed?: boolean;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * If is outlined
     */
    outlined?: boolean;
    /**
     * If Card is without radius
     */
    rectangular?: boolean;
    /**
     * Tab index for the card
     */
    tabIndex?: number;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
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
