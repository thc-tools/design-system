// Libs
import clsx from "clsx";
import React from "react";

export interface TagContainerProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className for container
     */
    className?: string;
    /**
     * is no-wrap
     */
    noWrap?: boolean;
}

export const TagContainer = React.forwardRef<HTMLDivElement, TagContainerProps>(function TagContainer(
    { children, className, noWrap = false, ...otherProps },
    ref
) {
    const containerClassName = clsx(
        "ds-c-tag-container",
        {
            "ds-c-tag-container--no-wrap": noWrap,
        },
        className
    );

    return (
        <div className={containerClassName} {...otherProps} ref={ref}>
            {children}
        </div>
    );
});
