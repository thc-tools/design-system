// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { useIsMounted } from "../../core/hooks";

// Components
import { Slide, SLIDE_DIRECTION } from "../animations";
import { Modal } from "./Modal";

export const DRAWER_SIZE = {
    AUTO: "auto",
    XL: "xl",
    L: "l",
    M: "m",
    S: "s",
};

export const DRAWER_TYPE = {
    TEMPORARY: "temporary",
    PERSISTENT: "persistent",
};

export const DRAWER_ANCHOR = {
    TOP: "top",
    LEFT: "left",
    RIGHT: "right",
    BOTTOM: "bottom",
};

const OPPOSITE_DIRECTIONS = {
    [DRAWER_ANCHOR.LEFT]: SLIDE_DIRECTION.RIGHT,
    [DRAWER_ANCHOR.RIGHT]: SLIDE_DIRECTION.LEFT,
    [DRAWER_ANCHOR.TOP]: SLIDE_DIRECTION.DOWN,
    [DRAWER_ANCHOR.BOTTOM]: SLIDE_DIRECTION.UP,
};

export const Drawer = React.forwardRef(function Drawer(
    {
        anchor = DRAWER_ANCHOR.RIGHT,
        children,
        className,
        modalClassName: modalClassNameProp,
        modalProps,
        onClose,
        open = false,
        paperClassName: paperClassNameProp,
        paperProps,
        size = DRAWER_SIZE.AUTO,
        sliderClassName: sliderClassNameProp,
        sliderProps,
        type = DRAWER_TYPE.TEMPORARY,
        ...otherProps
    },
    ref
) {
    const isMounted = useIsMounted();

    const rootClassName = classnames(
        "thc-c-drawer",
        { "thc-c-drawer--docked": type === DRAWER_TYPE.PERSISTENT },
        className
    );
    const modalClassName = classnames("thc-c-drawer__modal", modalClassNameProp);
    const paperClassName = classnames(
        "thc-o-paper",
        "thc-c-drawer__paper",
        `thc-c-drawer__paper--${anchor}`,
        {
            "thc-c-drawer__paper--XL": size === DRAWER_SIZE.XL,
            "thc-c-drawer__paper--L": size === DRAWER_SIZE.L,
            "thc-c-drawer__paper--M": size === DRAWER_SIZE.M,
            "thc-c-drawer__paper--S": size === DRAWER_SIZE.S,
        },
        paperClassNameProp
    );
    const sliderClassName = classnames("thc-c-drawer__slider", sliderClassNameProp);

    const drawer = (
        <div {...paperProps} className={paperClassName} ref={ref}>
            {children}
        </div>
    );

    const slidingDrawer = (
        <Slide
            {...sliderProps}
            appear={isMounted.current}
            className={sliderClassName}
            direction={OPPOSITE_DIRECTIONS[anchor]}
            in={open}
        >
            {drawer}
        </Slide>
    );

    if (type === DRAWER_TYPE.PERSISTENT) {
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

Drawer.propTypes = {
    /**
     * Anchor position to the window
     */
    anchor: PropTypes.oneOf(Object.values(DRAWER_ANCHOR)),
    /**
     * Children component
     */
    children: PropTypes.node,
    /**
     * Additional className for Drawer
     */
    className: PropTypes.string,
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
     * Size of the Drawer
     */
    size: PropTypes.oneOf(Object.values(DRAWER_SIZE)),
    /**
     * Additional className for Slider
     */
    sliderClassName: PropTypes.string,
    /**
     * Additional props for Slider
     */
    sliderProps: PropTypes.shape(Slide.propTypes),
    /**
     * Type of Drawer
     */
    type: PropTypes.oneOf(Object.values(DRAWER_TYPE)),
};
