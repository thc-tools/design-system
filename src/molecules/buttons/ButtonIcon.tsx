// Libs
import clsx from "clsx";
import React from "react";

// Components
import { Icon } from "../icons";
import { Button, ButtonProps } from "./Button";

export type ButtonIconProps = ButtonProps;

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(function ButtonICon(
    { className, icon, children, iconSize = "m", iconProps, ...otherProps },
    ref
) {
    const buttonClassName = clsx("ds-c-button-icon", className);
    const child = icon ?? children;

    return (
        <Button {...otherProps} className={buttonClassName} ref={ref}>
            <Icon {...iconProps} size={iconSize}>
                {child}
            </Icon>
        </Button>
    );
});
