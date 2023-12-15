// Libs
import clsx from "clsx";
import React from "react";

// Utils
import { useIsMounted } from "../../core/hooks";
import { RDivProps, alterElement, getCSSVariable } from "../../core/utils";

// Components
import { Slide, SlideProps } from "../animations";
import { Modal, ModalProps } from "./Modal";

export interface BannerProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Color value or name for color
     */
    color?: string;
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
     * Additional props for Slide
     */
    slideProps?: SlideProps;
}

export function Banner({
    children,
    className,
    color: colorProp = "--ds-color--primary-500",
    modalClassName: modalClassNameProp,
    modalProps,
    onClose,
    open = false,
    paperClassName: paperClassNameProp,
    paperProps,
    slideProps,
    ...otherProps
}: BannerProps) {
    const rootClassName = clsx("ds-theme--color ds-c-banner", className);
    const modalClassName = clsx("ds-c-banner__modal", modalClassNameProp);
    const paperClassName = clsx("ds-c-banner__paper", paperClassNameProp);

    const isMounted = useIsMounted();

    const color = colorProp.startsWith("--ds") ? getCSSVariable(colorProp) : colorProp;

    return (
        <div {...otherProps} className={rootClassName}>
            <Modal {...modalProps} className={modalClassName} onClose={onClose} open={open}>
                <Slide {...slideProps} appear={isMounted} direction="down" in={open}>
                    <div {...paperProps} className={paperClassName} style={{ backgroundColor: color }}>
                        {React.Children.map(children, (child) =>
                            alterElement(child, { className: "ds-c-banner__child" })
                        )}
                    </div>
                </Slide>
            </Modal>
        </div>
    );
}
