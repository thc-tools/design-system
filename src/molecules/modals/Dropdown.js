// Libs
import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { debounce } from "lodash";

// Components
import { Grow } from "../animations";
import { Modal } from "./Modal";

// Utils
import { getOffsetTop, getOffsetLeft, getTransformOriginValue } from "./_utils";

const MARGIN_THRESHOLD = 16;

export const VERTICAL_TRANSFORM = {
    TOP: "top",
    CENTER: "center",
    BOTTOM: "bottom",
};

export const HORIZONTAL_TRANSFORM = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
};

function getElement(element) {
    if (typeof element === "function") {
        return element();
    }

    return element.current;
}

const defaultAnchorOrigin = {
    vertical: VERTICAL_TRANSFORM.BOTTOM,
    horizontal: HORIZONTAL_TRANSFORM.LEFT,
};

const defaultTransformOrigin = {
    vertical: VERTICAL_TRANSFORM.TOP,
    horizontal: HORIZONTAL_TRANSFORM.LEFT,
};
export function Dropdown({
    anchorEl,
    anchorOrigin = defaultAnchorOrigin,
    children,
    className,
    contentClassName: contentClassNameProp,
    growProps,
    modalClassName: modalClassNameProp,
    modalProps,
    onClose,
    onEntering,
    open = false,
    transformOrigin = defaultTransformOrigin,
    ...otherProps
}) {
    const dropdownClassName = classnames("thc-c-dropdown", className);
    const modalClassName = classnames("thc-c-dropdown__modal", modalClassNameProp);
    const contentClassName = classnames(
        "thc-o-box",
        "thc-o-paper",
        "thc-o-paper--shadow",
        "thc-c-dropdown__content",
        contentClassNameProp
    );

    const childrenRef = useRef();

    const getAnchorOffset = useCallback(() => {
        const anchorRect = getElement(anchorEl).getBoundingClientRect();

        return {
            top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
            left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
        };
    }, [anchorEl, anchorOrigin.vertical, anchorOrigin.horizontal]);

    const getTransformOrigin = useCallback(
        (elementRect) => {
            return {
                vertical: getOffsetTop(elementRect, transformOrigin.vertical),
                horizontal: getOffsetLeft(elementRect, transformOrigin.horizontal),
            };
        },
        [transformOrigin.vertical, transformOrigin.horizontal]
    );

    const getPositionStyle = useCallback((elementRect, transformOrigin, anchorOffset) => {
        let top = anchorOffset.top - transformOrigin.vertical;
        let left = anchorOffset.left - transformOrigin.horizontal;
        const bottom = top + elementRect.height;
        const right = left + elementRect.width;

        const heightThreshold = window.innerHeight - MARGIN_THRESHOLD;
        const widthThreshold = window.innerWidth - MARGIN_THRESHOLD;

        if (top < MARGIN_THRESHOLD) {
            const diff = top - MARGIN_THRESHOLD;
            top -= diff;
            transformOrigin.vertical += diff;
        } else if (bottom > heightThreshold) {
            const diff = bottom - heightThreshold;
            top -= diff;
            transformOrigin.vertical += diff;
        }

        if (left < MARGIN_THRESHOLD) {
            const diff = left - MARGIN_THRESHOLD;
            left -= diff;
            transformOrigin.horizontal += diff;
        } else if (right > widthThreshold) {
            const diff = right - widthThreshold;
            left -= diff;
            transformOrigin.horizontal += diff;
        }

        return {
            top: `${Math.round(top)}px`,
            left: `${Math.round(left)}px`,
            transformOrigin: getTransformOriginValue(transformOrigin),
        };
    }, []);

    const setPositionStyle = useCallback(() => {
        const element = getElement(childrenRef);

        if (!element) {
            return;
        }

        const elementRect = {
            width: element.offsetWidth,
            height: element.offsetHeight,
        };
        const transformOrigin = getTransformOrigin(elementRect);
        const anchorOffset = getAnchorOffset();

        const positioning = getPositionStyle(elementRect, transformOrigin, anchorOffset);

        element.style.top = positioning.top;
        element.style.left = positioning.left;
        element.style.transformOrigin = positioning.transformOrigin;
    }, [getTransformOrigin, getAnchorOffset, getPositionStyle]);

    useEffect(() => {
        setPositionStyle();
    }, [setPositionStyle]);

    useEffect(() => {
        if (!open) {
            return;
        }

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "15px";

        return () => {
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("padding-right");
        };
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleResize = debounce(() => setPositionStyle());
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener("resize", handleResize);
        };
    }, [open, setPositionStyle]);

    const handleEntering = (element, isAppearing) => {
        if (onEntering) {
            onEntering(element, isAppearing);
        }

        setPositionStyle();
    };

    return (
        <div {...otherProps} className={dropdownClassName}>
            <Modal className={modalClassName} open={open} onClose={onClose} invisibleOverlay {...modalProps}>
                <Grow {...growProps} appear in={open} onEntering={handleEntering}>
                    <div className={contentClassName} ref={childrenRef}>
                        {children}
                    </div>
                </Grow>
            </Modal>
        </div>
    );
}

Dropdown.propTypes = {
    /**
     * Anchoring element
     */
    anchorEl: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })])
        .isRequired,
    /**
     * Origin on anchoring element
     */
    anchorOrigin: PropTypes.shape({
        vertical: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.values(VERTICAL_TRANSFORM))])
            .isRequired,
        horizontal: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.values(HORIZONTAL_TRANSFORM))])
            .isRequired,
    }),
    /**
     * Children element
     */
    children: PropTypes.node,
    /**
     * Additional className to dropdown
     */
    className: PropTypes.string,
    /**
     * Additional className to content
     */
    contentClassName: PropTypes.string,
    /**
     * Additional props for Grow
     */
    growProps: PropTypes.shape(Grow.propTypes),
    /**
     * Additional className to modal
     */
    modalClassName: PropTypes.string,
    /**
     * Additional props to modal
     */
    modalProps: PropTypes.shape(Modal.propTypes),
    /**
     * Close handler
     */
    onClose: PropTypes.func,
    /**
     * Entering handler
     */
    onEntering: PropTypes.func,
    /**
     * If is open
     */
    open: PropTypes.bool,
    /**
     *
     */
    transformOrigin: PropTypes.shape({
        vertical: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.values(VERTICAL_TRANSFORM))])
            .isRequired,
        horizontal: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.values(HORIZONTAL_TRANSFORM))])
            .isRequired,
    }),
};
