// Libs
import clsx from "clsx";
import React from "react";

export type CardContainerOrientation = "horizontal" | "vertical";

export interface CardContainerProps extends React.PropsWithChildren<unknown> {
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
    orientation?: CardContainerOrientation;
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
    const rootClassName = clsx(
        "ds-c-card-container",
        {
            "ds-c-card-container--condensed": condensed,
            "ds-c-card-container--horizontal": orientation === "horizontal",
            "ds-c-card-container--vertical": orientation === "vertical",
            "ds-c-card-container--full-height": fullHeight,
            "ds-c-card-container--full-width": fullWidth,
        },
        className
    );

    return (
        <div {...otherProps} className={rootClassName} ref={ref}>
            {children}
        </div>
    );
});
