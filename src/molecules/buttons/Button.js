// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { wrapLabel, wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { IconWrapper, ICON_SIZE, ICON_POSITION } from "../icons";
import { LoaderIcon } from "../loaders";

export const BUTTON_TYPES = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    CAUTION: "caution",
};

export { ICON_SIZE as BUTTON_ICON_SIZE, ICON_POSITION as BUTTON_ICON_POSITION };

export const Button = React.forwardRef(function Button(
    {
        children,
        className,
        disabled: disabledProp = false,
        icon,
        iconClassName: iconClassNameProp,
        iconPosition = ICON_POSITION.LEFT,
        iconProps,
        iconSize = ICON_SIZE.M,
        isLoading = false,
        label,
        onClick,
        submit = false,
        type = BUTTON_TYPES.PRIMARY,
        ...otherProps
    },
    ref
) {
    const disabled = disabledProp || isLoading;

    const buttonClassName = classnames(
        {
            "thc-theme--color": !disabled && [BUTTON_TYPES.PRIMARY, BUTTON_TYPES.CAUTION].includes(type),
        },
        "thc-o-actionable",
        "thc-c-button",
        {
            "thc-c-button--primary": type === BUTTON_TYPES.PRIMARY,
            "thc-c-button--secondary": type === BUTTON_TYPES.SECONDARY,
            "thc-c-button--caution": type === BUTTON_TYPES.CAUTION,
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

Button.propTypes = {
    /**
     * Content of the button
     */
    children: PropTypes.node,
    /**
     * Additional className for the button
     */
    className: PropTypes.string,
    /**
     * If button is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Icon displayed with the button
     */
    icon: IconWrapper.propTypes.icon,
    /**
     * Additional className for the icon
     */
    iconClassName: PropTypes.string,
    /**
     * Position of the icon
     */
    iconPosition: IconWrapper.propTypes.position,
    /**
     * Additional props for icon
     */
    iconProps: PropTypes.shape(IconWrapper.propTypes),
    /**
     * Size of the icon
     */
    iconSize: IconWrapper.propTypes.size,
    /**
     * If is loading
     */
    isLoading: PropTypes.bool,
    /**
     * Label of the button
     */
    label: PropTypes.string,
    /**
     * Click handler
     */
    onClick: PropTypes.func,
    /**
     * If is submit button
     */
    submit: PropTypes.bool,
    /**
     * Type of button
     */
    type: PropTypes.oneOf([...Object.values(BUTTON_TYPES), "tab"]),
};
