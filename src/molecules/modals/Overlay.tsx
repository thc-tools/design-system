// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { wrapPrevent } from "../../core/utils";

export interface OverlayProps {
    /**
     * Additional className to overlay
     */
    className?: string;
    /**
     * If overlay is invisible
     */
    invisible?: boolean;
    /**
     * Click handler
     */
    onClick: React.MouseEventHandler<HTMLDivElement>;
    /**
     * If is open
     */
    open?: boolean;
}

export function Overlay({ className, invisible = false, onClick, open = false, ...otherProps }: OverlayProps) {
    const overlayClassName = classnames(
        "thc-c-overlay",
        {
            "thc-c-overlay--invisible": invisible,
        },
        className
    );

    const handleClick = wrapPrevent(onClick);

    if (!open) {
        return null;
    }

    return <div aria-hidden className={overlayClassName} onClick={handleClick} {...otherProps} />;
}
