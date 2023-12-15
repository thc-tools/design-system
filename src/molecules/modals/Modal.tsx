// Libs
import clsx from "clsx";
import React, { useCallback, useState } from "react";

// Utils
import { createChainedFunction, isReactElement } from "../../core/utils";

// Components
import { Overlay } from "./Overlay";
import { Portal } from "./Portal";

function getHasTransition(children: React.ReactNode): boolean {
    return isReactElement(children) ? Object.prototype.hasOwnProperty.call(children.props, "in") : false;
}

export interface ModalProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className to modal
     */
    className?: string;
    /**
     * If disables escape listener
     */
    disableEscapeKeyDown?: boolean;
    /**
     * If overlay is hidden
     */
    hideOverlay?: boolean;
    /**
     * If overlay is invisible
     */
    invisibleOverlay?: boolean;
    /**
     * Close handler
     */
    onClose?: (event?: React.MouseEvent<HTMLDivElement>, origin?: "overlayClick" | "escapeKeyDown") => void;
    /**
     * If is open
     */
    open?: boolean;
    /**
     * Additional className to overlay
     */
    overlayClassName?: string;
    /**
     * Role to display element
     */
    role?: string;
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
}: ModalProps) {
    const [exited, setExited] = useState(true);
    const hasTransition = getHasTransition(children);

    const rootClassName = clsx(
        "ds-c-modal",
        // { "ds-c-modal--hidden": !open && (!hasTransition || exited) },
        className
    );
    const overlayClassName = clsx("ds-c-modal__overlay", overlayClassNameProp);
    const contentClassName = clsx(
        "ds-c-modal__content",
        isReactElement(children) ? children.props.className : undefined
    );

    const _handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
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

    const childProps: Record<string, unknown> = {};

    // Hack into child transition to keep Modal open during animation
    if (hasTransition) {
        const _handleEnter = () => {
            setExited(false);
        };

        const _handleExited = () => {
            setExited(true);
        };

        childProps.onEnter = createChainedFunction(
            _handleEnter,
            isReactElement(children) ? children.props?.onEnter : null
        );
        childProps.onExited = createChainedFunction(
            _handleExited,
            isReactElement(children) ? children.props?.onExited : null
        );
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
            <div {...otherProps} className={rootClassName} onKeyDown={_handleKeyDown} role={role}>
                {!hideOverlay && (
                    <Overlay
                        className={overlayClassName}
                        invisible={invisibleOverlay}
                        onClick={_handleOverlayClick}
                        open={open}
                    />
                )}
                {isReactElement(children) &&
                    React.cloneElement(children, { className: contentClassName, ...childProps })}
            </div>
        </Portal>
    );
}
