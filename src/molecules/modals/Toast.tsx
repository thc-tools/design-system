// Libs
import React from "react";
import PropTypes from "prop-types";

// Components
import { IconWrapper } from "../icons";

/**
 * Type of toasts
 */
export const TOAST_TYPES = {
    DARK: "dark",
    DEFAULT: "default",
    ERROR: "error",
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
};

/**
 * Default icon for toasts
 */
const TOAST_ICONS = {
    [TOAST_TYPES.ERROR]: "error",
    [TOAST_TYPES.SUCCESS]: "success",
    [TOAST_TYPES.WARNING]: "warning",
    [TOAST_TYPES.INFO]: "info",
};

export function Toast({ content, options }) {
    if (typeof content !== "string") {
        return content;
    }

    const icon = TOAST_ICONS[options.type];

    return (
        <IconWrapper icon={icon}>
            <span>{content}</span>
        </IconWrapper>
    );
}

Toast.propTypes = {
    /**
     * Content to display
     */
    content: PropTypes.node,
    /**
     * Options available through toastify
     * see: https://fkhadra.github.io/react-toastify/api/toast
     */
    options: PropTypes.object,
};
