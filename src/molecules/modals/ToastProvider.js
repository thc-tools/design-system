// Libs
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ToastContainer as ToastifyContainer, toast as toastifyToast } from "react-toastify";

// Utils
import { useToast, ToastContext } from "../../core/ToastContext";

// Components
import { ButtonIcon } from "../buttons";
import { useTheme, THEME } from "../../core";
import { Toast } from "./Toast";

export { useToast };

/**
 * Inner component to display Close button on toasts
 */
function CloseButton({ closeToast }) {
    return <ButtonIcon icon="close" onClick={closeToast} type="secondary" />;
}

export function ToastProvider({
    children,
    className,
    containerProps,
    position = "bottom-left",
    toastClassName: toastClassNameProp,
}) {
    const rootClassName = classnames("thc-c-toast-container", className);
    const toastClassName = classnames("thc-theme--color thc-c-toast", toastClassNameProp);

    const { theme } = useTheme();

    /**
     * Wrapper to enqueue a toast using custom Toast component
     */
    const enqueueToast = useCallback(
        (content, options = {}) => {
            if (!options.type) {
                options.type = theme === THEME.LIGHT ? toastifyToast.TYPE.DEFAULT : toastifyToast.TYPE.DARK;
            }

            return toastifyToast(<Toast content={content} options={options} />, options);
        },
        [theme]
    );

    return (
        <ToastContext.Provider value={{ enqueueToast, dismissToast: toastifyToast.dismiss }}>
            <div className={rootClassName}>
                {children}
                <ToastifyContainer
                    autoClose={5000}
                    closeButton={CloseButton}
                    limit={3}
                    newestOnTop
                    pauseOnFocusLoss
                    pauseOnHover
                    position={position}
                    {...containerProps}
                    toastClassName={toastClassName}
                />
            </div>
        </ToastContext.Provider>
    );
}

ToastProvider.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for Container
     */
    className: PropTypes.string,
    /**
     * Additional props for Container
     */
    containerProps: PropTypes.shape(ToastifyContainer.propTypes),
    /**
     * Position of container
     */
    position: PropTypes.string,
    /**
     * Additional className for Toast
     */
    toastClassName: PropTypes.string,
};
