// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { wrapKeyUp, wrapLabel, wrapPrevent } from "../../core/utils";

// Components
import { IconPosition, IconSize, IconWrapper, IconWrapperProps, Icons } from "../icons";
import { LoaderIcon } from "../loaders";

export type ButtonTypes = "primary" | "secondary" | "caution";

export interface ButtonProps extends React.PropsWithChildren<unknown> {
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
     * Variant of button
     */
    variant?: ButtonVariant | "tab";
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
        variant = "primary",
        ...otherProps
    },
    ref
) {
    const disabled = disabledProp || isLoading;

    const buttonClassName = clsx(
        {
            "ds-theme--color": !disabled && ["primary", "caution"].includes(variant),
        },
        "ds-o-actionable",
        "ds-c-button",
        {
            "ds-c-button--primary": variant === "primary",
            "ds-c-button--secondary": variant === "secondary",
            "ds-c-button--caution": variant === "caution",
        },
        "ds-u-typography--button",
        className
    );
    const iconClassName = clsx("ds-c-button__icon", iconClassNameProp);

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
                {...iconProps}
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
