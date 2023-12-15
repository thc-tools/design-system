// Libs
import clsx from "clsx";
import React from "react";

export type PageContentTypes = "centered" | "default" | "flex" | "withPanel";

export interface PageContentProps extends React.PropsWithChildren<unknown> {
    /**
     * If is full height
     */
    fullHeight?: boolean;
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is full width
     */
    fullWidth?: boolean;
    /**
     * Type of page layout
     */
    type?: PageContentTypes;
}

export function PageContent({
    children,
    className,
    fullHeight = false,
    fullWidth = false,
    type = "default",
}: PageContentProps) {
    const rootClassName = clsx(
        "ds-c-page-content",
        {
            "ds-c-page-content--centered": type === "centered",
            "ds-c-page-content--flex": type === "flex",
            "ds-c-page-content--full-height": fullHeight,
            "ds-c-page-content--full-width": fullWidth,
            "ds-c-page-content--with-panel": type === "withPanel",
        },
        className
    );

    if (type === "withPanel") {
        const childrenArray = React.Children.toArray(children);

        return (
            <div className={rootClassName}>
                <div className="ds-c-page-content--with-panel__panel ds-o-paper">{childrenArray[0]}</div>
                <div className="ds-c-page-content--with-panel__detail">{childrenArray.slice(1)}</div>
            </div>
        );
    }

    return <div className={rootClassName}>{children}</div>;
}
