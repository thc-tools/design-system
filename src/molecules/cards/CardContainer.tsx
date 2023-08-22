// Libs
import classnames from "classnames";
import React from "react";

export type CardContainerOrientation = "horizontal" | "vertical";

export interface CardContainerProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is condensed
     */
    condensed?: boolean;
    /**
     * If is full height
     */
    fullHeight?: boolean;
    /**
     * If is full width
     */
    fullWidth?: boolean;
    /**
     * Orientation for container
     */
    orientation: CardContainerOrientation;
}

export const CardContainer = React.forwardRef<HTMLDivElement, CardContainerProps>(function CardContainer(
    {
        children,
        className,
        condensed = false,
        fullHeight = false,
        fullWidth = false,
        orientation = "vertical",
        ...otherProps
    },
    ref
) {
    const rootClassName = classnames(
        "thc-c-card-container",
        {
            "thc-c-card-container--condensed": condensed,
            "thc-c-card-container--horizontal": orientation === "horizontal",
            "thc-c-card-container--vertical": orientation === "vertical",
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
