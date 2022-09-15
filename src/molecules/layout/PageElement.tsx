// Libs
import clsx from "clsx";
import React from "react";

// Components

export interface PageElementProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is top element
     */
    isTopElement?: boolean;
}

export function PageElement({
    children,
    className: classNameProp,
    isTopElement = false,
}: PageElementProps): JSX.Element {
    const className = clsx("ds-c-page-element", { "ds-c-page-element--top-element": isTopElement }, classNameProp);

    return <div className={className}>{children}</div>;
}
