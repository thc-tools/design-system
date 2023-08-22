// Libs
import classnames from "classnames";
import React from "react";

export interface BubbleValueContainerProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
}

export function BubbleValueContainer({ children, className }: BubbleValueContainerProps) {
    const rootClassName = classnames("thc-c-bubble-container", className);

    return <div className={rootClassName}>{children}</div>;
}
