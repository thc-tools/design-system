// Libs
import classnames from "classnames";
import React from "react";

// Utils
import { useIsMounted } from "../../core/hooks";
import { DivProps, alterElement, getCSSVariable } from "../../core/utils";

// Components
import { Slide, SlideProps } from "../animations";
import { Modal, ModalProps } from "./Modal";

export interface BannerProps extends React.PropsWithChildren<{}> {
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
    paperProps?: DivProps;
    /**
     * Additional props for Slide
     */
    slideProps?: SlideProps;
}

export function Banner({
    children,
    className,
    color: colorProp = "--thc-color--blue-100",
    modalClassName: modalClassNameProp,
    modalProps,
    onClose,
    open = false,
    paperClassName: paperClassNameProp,
    paperProps,
    slideProps,
    ...otherProps
}: BannerProps) {
    const rootClassName = classnames("thc-theme--color thc-c-banner", className);
    const modalClassName = classnames("thc-c-banner__modal", modalClassNameProp);
    const paperClassName = classnames("thc-c-banner__paper", paperClassNameProp);

    const isMounted = useIsMounted();

    const color = colorProp.startsWith("--thc") ? getCSSVariable(colorProp) : colorProp;

    return (
        <div {...otherProps} className={rootClassName}>
            <Modal {...modalProps} className={modalClassName} onClose={onClose} open={open}>
                <Slide {...slideProps} appear={isMounted.current} direction="down" in={open}>
                    <div {...paperProps} className={paperClassName} style={{ backgroundColor: color }}>
                        {React.Children.map(children, (child) =>
                            alterElement(child, { className: "thc-c-banner__child" })
                        )}
                    </div>
                </Slide>
            </Modal>
        </div>
    );
}
