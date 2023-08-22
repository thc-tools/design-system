// Libs
import classnames from "classnames";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef } from "react";

// Components
import { Grow, GrowProps } from "../animations";
import { Modal, ModalProps } from "./Modal";

// Utils
import { getOffsetLeft, getOffsetTop, getTransformOriginValue } from "./_utils";

const MARGIN_THRESHOLD = 16;

function getElement(
    element: (() => HTMLElement | undefined | null) | React.MutableRefObject<HTMLElement | undefined | null>
): HTMLElement | undefined | null {
    if (typeof element === "function") {
        return element();
    }

    return element.current;
}

export type VerticalTransform = "top" | "center" | "bottom";
export type HorizontalTransform = "left" | "center" | "right";

export interface AnchorOrigin {
    vertical: VerticalTransform;
    horizontal: HorizontalTransform;
}

const defaultAnchorOrigin: AnchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
};

const defaultTransformOrigin: AnchorOrigin = {
    vertical: "top",
    horizontal: "left",
};

export interface DropdownProps extends React.PropsWithChildren<{}> {
    /**
     * Anchoring element
     */
    anchorEl: (() => HTMLElement | undefined | null) | React.MutableRefObject<HTMLElement | undefined | null>;
    /**
     * Origin on anchoring element
     */
    anchorOrigin?: AnchorOrigin;
    /**
     * Additional className to dropdown
     */
    className?: string;
    /**
     * Additional className to content
     */
    contentClassName?: string;
    /**
     * Additional props for Grow
     */
    growProps?: GrowProps;
    /**
     * Additional className to modal
     */
    modalClassName?: string;
    /**
     * Additional props to modal
     */
    modalProps?: ModalProps;
    /**
     * Close handler
     */
    onClose: ModalProps["onClose"];
    /**
     * Entering handler
     */
    onEntering?: GrowProps["onEntering"];
    /**
     * If is open
     */
    open?: boolean;
    /**
     * Transform of origin
     */
    transformOrigin?: AnchorOrigin;
}

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
}: DropdownProps) {
    const dropdownClassName = classnames("thc-c-dropdown", className);
    const modalClassName = classnames("thc-c-dropdown__modal", modalClassNameProp);
    const contentClassName = classnames(
        "thc-o-box",
        "thc-o-paper",
        "thc-o-paper--shadow",
        "thc-c-dropdown__content",
        contentClassNameProp
    );

    const childrenRef = useRef<HTMLDivElement>(null);

    const getAnchorOffset = useCallback(() => {
        const anchorRect = getElement(anchorEl)?.getBoundingClientRect();

        if (!anchorRect) {
            return;
        }

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

    const handleEntering = (element: HTMLDivElement | null, isAppearing?: boolean) => {
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
