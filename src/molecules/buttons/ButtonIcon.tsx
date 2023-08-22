// Libs
import classnames from "classnames";
import React from "react";

// Components
import { Icon } from "../icons";
import { Button, ButtonProps } from "./Button";

export interface ButtonIconProps extends ButtonProps {}

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(function ButtonICon(
    { className, icon, children, iconSize = "m", iconProps, ...otherProps },
    ref
) {
    const buttonClassName = classnames("thc-c-button-icon", className);
    const child = icon ?? children;

    return (
        <Button {...otherProps} className={buttonClassName} ref={ref}>
            <Icon {...iconProps} size={iconSize}>
                {child}
            </Icon>
        </Button>
    );
});

ButtonIcon.propTypes = {
    ...Button.propTypes,
};
