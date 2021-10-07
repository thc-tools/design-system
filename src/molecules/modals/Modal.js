// Libs
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { createChainedFunction } from "../../core/utils";

// Components
import { Overlay } from "./Overlay";
import { Portal } from "./Portal";

function getHasTransition(children) {
    return children ? children.props.hasOwnProperty("in") : false;
}

export function Modal({
    children,
    className,
    disableEscapeKeyDown = false,
    hideOverlay = false,
    invisibleOverlay = false,
    onClose,
    open = false,
    overlayClassName: overlayClassNameProp,
    role = "presentation",
    ...otherProps
}) {
    const [exited, setExited] = useState(true);
    const hasTransition = getHasTransition(children);

    const rootClassName = classnames(
        "thc-c-modal",
        // { "thc-c-modal--hidden": !open && (!hasTransition || exited) },
        className
    );
    const overlayClassName = classnames("thc-c-modal__overlay", overlayClassNameProp);
    const contentClassName = classnames("thc-c-modal__content", children?.props.className);

    const _handleOverlayClick = useCallback(
        (event) => {
            if (event.target !== event.currentTarget) {
                return;
            }

            if (onClose) {
                onClose(event, "overlayClick");
            }
        },
        [onClose]
    );

    const _handleKeyDown = useCallback(
        (event) => {
            if (event.key !== "Escape") {
                return;
            }

            if (!disableEscapeKeyDown) {
                event.stopPropagation();

                if (onClose) {
                    onClose(event, "escapeKeyDown");
                }
            }
        },
        [disableEscapeKeyDown, onClose]
    );

    if (!open && (!hasTransition || exited)) {
        return null;
    }

    const childProps = {};

    // Hack into child transition to keep Modal open during animation
    if (hasTransition) {
        const _handleEnter = () => {
            setExited(false);
        };

        const _handleExited = () => {
            setExited(true);
        };

        childProps.onEnter = createChainedFunction(_handleEnter, children.props?.onEnter);
        childProps.onExited = createChainedFunction(_handleExited, children.props?.onExited);
    }

    /*
     * Marking an element with the role presentation indicates to assistive technology
     * that this element should be ignored; it exists to support the web application and
     * is not meant for humans to interact with directly.
     * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
     */
    return (
        <Portal>
            {/* The <div> element has a child <role> attribute that allows keyboard interaction */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div {...otherProps} className={rootClassName} onKeyDown={_handleKeyDown} role={role}>
                {!hideOverlay && (
                    <Overlay
                        className={overlayClassName}
                        invisible={invisibleOverlay}
                        onClick={_handleOverlayClick}
                        open={open}
                    />
                )}
                {children && React.cloneElement(children, { className: contentClassName, ...childProps })}
            </div>
        </Portal>
    );
}

Modal.propTypes = {
    /**
     * Children element
     */
    children: PropTypes.element,
    /**
     * Additional className to modal
     */
    className: PropTypes.string,
    /**
     * If disables escape listener
     */
    disableEscapeKeyDown: PropTypes.bool,
    /**
     * If overlay is hidden
     */
    hideOverlay: PropTypes.bool,
    /**
     * If overlay is invisible
     */
    invisibleOverlay: PropTypes.bool,
    /**
     * Close handler
     */
    onClose: PropTypes.func,
    /**
     * If is open
     */
    open: PropTypes.bool,
    /**
     * Additional className to overlay
     */
    overlayClassName: PropTypes.string,
    /**
     * Role to display element
     */
    role: PropTypes.string,
};
