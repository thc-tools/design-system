// Libs
import React from "react";
// import useResizeAware from 'react-resize-aware';
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";
import { useForkRef, useWidth } from "../../core/hooks";
import { createAnimation, DURATION, EASING } from "../animations/_utils";
// Component
import { DRAWER_ANCHOR, DRAWER_TYPE } from "./Drawer";

export function DrawerAwareContainer({
    anchor = DRAWER_ANCHOR.RIGHT,
    children,
    className,
    drawer,
    open = false,
    width: widthProp,
}) {
    const rootClassName = classnames(
        "thc-c-drawer-aware-container",
        `thc-c-drawer-aware-container--anchor-${anchor}`,
        className
    );

    const { width, div: drawerRef } = useWidth(widthProp);
    const handleRef = useForkRef(drawerRef, drawer.props.ref);

    return (
        <div className={rootClassName}>
            {alterElement(drawer, {
                anchor,
                className: "thc-c-drawer-aware-container__drawer",
                open,
                ref: handleRef,
                type: DRAWER_TYPE.PERSISTENT,
            })}
            <div className="thc-c-drawer-aware-container__drawer-placeholder" style={{ width: width }} />
            <div
                className="thc-c-drawer-aware-container__content"
                style={{
                    marginLeft: !open && anchor === DRAWER_ANCHOR.LEFT ? -(width ?? 0) : 0,
                    marginRight: !open && anchor === DRAWER_ANCHOR.RIGHT ? -(width ?? 0) : 0,
                    transition: open
                        ? createAnimation("margin", {
                              easing: EASING.easeOut,
                              duration: DURATION.enteringScreen,
                          })
                        : createAnimation("margin", {
                              easing: EASING.sharp,
                              duration: DURATION.leavingScreen,
                          }),
                }}
            >
                {children}
            </div>
        </div>
    );
}

DrawerAwareContainer.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
};
