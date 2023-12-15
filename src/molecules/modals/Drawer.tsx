// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { useIsMounted } from "../../core/hooks";

// Components
import { RDivProps } from "../../core/utils";
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

export interface DrawerProps extends React.PropsWithChildren<unknown> {
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
    paperProps?: RDivProps;
    /**
     * Size of the Drawer
     */
    size?: DrawerSize;
    /**
     * Additional props for Slider
     */
    sliderProps?: SlideProps;
    /**
     * Type of Drawer
     */
    type?: DrawerType;
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

    const rootClassName = clsx("ds-c-drawer", { "ds-c-drawer--docked": type === "persistent" }, className);
    const modalClassName = clsx("ds-c-drawer__modal", modalClassNameProp);
    const paperClassName = clsx(
        "ds-o-paper",
        "ds-c-drawer__paper",
        `ds-c-drawer__paper--${anchor}`,
        {
            "ds-c-drawer__paper--XL": size === "xl",
            "ds-c-drawer__paper--L": size === "l",
            "ds-c-drawer__paper--M": size === "m",
            "ds-c-drawer__paper--S": size === "s",
        },
        paperClassNameProp
    );

    const drawer = (
        <div {...paperProps} className={paperClassName} ref={ref}>
            {children}
        </div>
    );

    const slidingDrawer = (
        <Slide {...sliderProps} appear={isMounted} direction={OPPOSITE_DIRECTIONS[anchor]} in={open}>
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
