// Libs
import classnames from "classnames";
import React, { PropsWithChildren } from "react";

// Utils
import { useIsMounted } from "../../core/hooks";

// Components
import { DivProps } from "../../core/utils";
import { Slide, SlideDirection, SlideProps } from "../animations";
import { Modal, ModalProps } from "./Modal";

export type DrawerSize = "auto" | "xl" | "l" | "m" | "s";

export type DrawerType = "temporary" | "persistent";

export type DrawerAnchor = "top" | "left" | "right" | "bottom";

const OPPOSITE_DIRECTIONS: Record<DrawerAnchor, SlideDirection> = {
    left: "right",
    right: "left",
    top: "down",
    bottom: "up",
};

export interface DrawerProps extends PropsWithChildren<{}> {
    /**
     * Anchor position to the window
     */
    anchor?: DrawerAnchor;
    /**
     * Additional className for Drawer
     */
    className?: string;
    /**
     * Additional className for Modal
     */
    modalClassName?: string;
    /**
     * Additional props for Modal
     */
    modalProps?: ModalProps;
    /**
     * Close handler
     */
    onClose?: ModalProps["onClose"];
    /**
     * If is open
     */
    open?: boolean;
    /**
     * Additional className for Paper
     */
    paperClassName?: string;
    /**
     * Additional props for Paper
     */
    paperProps?: DivProps;
    /**
     * Size of the Drawer
     */
    size?: DrawerSize;
    /**
     * Additional props for Slider
     */
    sliderProps: SlideProps;
    /**
     * Type of Drawer
     */
    type: DrawerType;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
    {
        anchor = "right",
        children,
        className,
        modalClassName: modalClassNameProp,
        modalProps,
        onClose,
        open = false,
        paperClassName: paperClassNameProp,
        paperProps,
        size = "auto",
        sliderProps,
        type = "temporary",
        ...otherProps
    },
    ref
) {
    const isMounted = useIsMounted();

    const rootClassName = classnames("thc-c-drawer", { "thc-c-drawer--docked": type === "persistent" }, className);
    const modalClassName = classnames("thc-c-drawer__modal", modalClassNameProp);
    const paperClassName = classnames(
        "thc-o-paper",
        "thc-c-drawer__paper",
        `thc-c-drawer__paper--${anchor}`,
        {
            "thc-c-drawer__paper--XL": size === "xl",
            "thc-c-drawer__paper--L": size === "l",
            "thc-c-drawer__paper--M": size === "m",
            "thc-c-drawer__paper--S": size === "s",
        },
        paperClassNameProp
    );

    const drawer = (
        <div {...paperProps} className={paperClassName} ref={ref}>
            {children}
        </div>
    );

    const slidingDrawer = (
        <Slide {...sliderProps} appear={isMounted.current} direction={OPPOSITE_DIRECTIONS[anchor]} in={open}>
            {drawer}
        </Slide>
    );

    if (type === "persistent") {
        return <div className={rootClassName}>{slidingDrawer}</div>;
    }

    return (
        <div {...otherProps} className={rootClassName}>
            <Modal {...modalProps} className={modalClassName} open={open} onClose={onClose}>
                {slidingDrawer}
            </Modal>
        </div>
    );
});
