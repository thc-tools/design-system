// Libs
import React from "react";
import classnames from "classnames";

// Components
import { Icon, ICON_SIZE } from "../icons";
import { Button } from "./Button";

export const ButtonIcon = React.forwardRef(function ButtonICon(
    { className, icon, children, iconSize = ICON_SIZE.M, iconProps, ...otherProps },
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
