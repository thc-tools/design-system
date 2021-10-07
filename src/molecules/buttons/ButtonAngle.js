// Libs
import React from "react";
import classnames from "classnames";

// Components
import { Icon, ICON_SIZE } from "../icons";
import { Button } from "./Button";

export function ButtonAngle({ className, icon, children, ...otherProps }) {
    const buttonClassName = classnames("thc-c-button-angle", className);
    const child = icon ?? children;

    return (
        <Button className={buttonClassName} {...otherProps}>
            <Icon size={ICON_SIZE.M}>{child}</Icon>
        </Button>
    );
}

ButtonAngle.propTypes = {
    ...Button.propTypes,
};
