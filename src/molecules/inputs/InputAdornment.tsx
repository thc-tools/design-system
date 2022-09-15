// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { alterElement, filterProps } from "../../core/utils";

// Components
import { Icon, hasIcon } from "../icons";

export interface InputAdornmentProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className for the Adornment
     */
    className?: string;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<SVGSVGElement>;
}

export function InputAdornment({ children, className, onClick, ...otherProps }: InputAdornmentProps) {
    if (!children) {
        return null;
    }

    const rootClassName = clsx("ds-c-input-adornment", { "ds-o-actionable": Boolean(onClick) }, className);

    let child;

    if (typeof children === "string" && hasIcon(children)) {
        child = (
            <Icon onClick={onClick} size="s">
                {children}
            </Icon>
        );
    } else {
        child = alterElement(children, { onClick });
    }

    return (
        <div {...filterProps(otherProps)} className={rootClassName}>
            {child}
        </div>
    );
}
