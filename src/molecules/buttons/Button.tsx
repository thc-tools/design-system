// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { wrapKeyUp, wrapLabel, wrapPrevent } from "../../core/utils";

// Components
import { IconPosition, IconSize, IconWrapper, IconWrapperProps, Icons } from "../icons";
import { LoaderIcon } from "../loaders";

export type ButtonTypes = "primary" | "secondary" | "caution";

export interface ButtonProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for the button
     */
    className?: string;
    /**
     * If button is disabled
     */
    disabled?: boolean;
    /**
     * Icon displayed with the button
     */
    icon?: Icons;
    /**
     * Additional className for the icon
     */
    iconClassName?: string;
    /**
     * Position of the icon
     */
    iconPosition?: IconPosition;
    /**
     * Additional props for icon
     */
    iconProps?: IconWrapperProps;
    /**
     * Size of the icon
     */
    iconSize?: IconSize;
    /**
     * If is loading
     */
    isLoading?: boolean;
    /**
     * Label of the button
     */
    label?: string;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * If is submit button
     */
    submit?: boolean;
    /**
     * Type of button
     */
    type?: ButtonTypes | "tab";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        children,
        className,
        disabled: disabledProp = false,
        icon,
        iconClassName: iconClassNameProp,
        iconPosition = "left",
        iconProps,
        iconSize = "m",
        isLoading = false,
        label,
        onClick,
        submit = false,
        type = "primary",
        ...otherProps
    },
    ref
) {
    const disabled = disabledProp || isLoading;

    const buttonClassName = classnames(
        {
            "thc-theme--color": !disabled && ["primary", "caution"].includes(type),
        },
        "thc-o-actionable",
        "thc-c-button",
        {
            "thc-c-button--primary": type === "primary",
            "thc-c-button--secondary": type === "secondary",
            "thc-c-button--caution": type === "caution",
        },
        className
    );
    const iconClassName = classnames("thc-c-button__icon", iconClassNameProp);

    const wrappedChildren = wrapLabel(label ?? children);

    const handleOnClick = wrapPrevent(onClick);
    const handleKeyUp = wrapKeyUp(handleOnClick);

    return (
        <button
            className={buttonClassName}
            disabled={disabled === true}
            onClick={handleOnClick}
            onKeyUp={handleKeyUp}
            ref={ref}
            type={submit ? "submit" : "button"}
            {...otherProps}
        >
            <IconWrapper
                className={iconClassName}
                icon={isLoading ? <LoaderIcon /> : icon}
                position={iconPosition}
                size={iconSize}
            >
                {wrappedChildren}
            </IconWrapper>
        </button>
    );
});
