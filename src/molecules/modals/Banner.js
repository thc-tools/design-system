// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { useIsMounted } from "../../core/hooks";
import { getCSSVariable, alterElement } from "../../core/utils";

// Components
import { Slide } from "../animations";
import { Modal } from "./Modal";

export function Banner({
    children,
    className,
    color: colorProp = "--thc-color--primary-500",
    modalClassName: modalClassNameProp,
    modalProps,
    onClose,
    open = false,
    paperClassName: paperClassNameProp,
    paperProps,
    slideClassName: slideClassNameProp,
    slideProps,
    ...otherProps
}) {
    const rootClassName = classnames("thc-theme--color thc-c-banner", className);
    const modalClassName = classnames("thc-c-banner__modal", modalClassNameProp);
    const paperClassName = classnames("thc-c-banner__paper", paperClassNameProp);
    const slideClassName = classnames("thc-c-banner__slide", slideClassNameProp);

    const isMounted = useIsMounted();

    const color = colorProp.startsWith("--thc") ? getCSSVariable(colorProp) : colorProp;

    return (
        <div {...otherProps} className={rootClassName}>
            <Modal {...modalProps} className={modalClassName} onClose={onClose} open={open}>
                <Slide {...slideProps} appear={isMounted.current} className={slideClassName} direction="down" in={open}>
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

Banner.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Color value or name for color
     */
    color: PropTypes.string,
    /**
     * Additional className for Modal
     */
    modalClassName: PropTypes.string,
    /**
     * Additional props for Modal
     */
    modalProps: PropTypes.shape(Modal.propTypes),
    /**
     * Close handler
     */
    onClose: PropTypes.func,
    /**
     * If is open
     */
    open: PropTypes.bool,
    /**
     * Additional className for Paper
     */
    paperClassName: PropTypes.string,
    /**
     * Additional props for Paper
     */
    // eslint-disable-next-line react/forbid-prop-types
    paperProps: PropTypes.object,
    /**
     * Additional className for Slide
     */
    slideClassName: PropTypes.string,
    /**
     * Additional props for Slide
     */
    slideProps: PropTypes.shape(Slide.propTypes),
};
