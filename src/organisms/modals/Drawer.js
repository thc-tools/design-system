// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils
import { alterElement } from "../../core/utils";

// Components
import { ButtonIcon } from "../../molecules/buttons";
import { Drawer as MDrawer, DRAWER_SIZE } from "../../molecules/modals";

export { DRAWER_SIZE };

export function Drawer({
    closeButtonClassName: closeButtonClassNameProp,
    closeButtonProps,
    children,
    onClose,
    title,
    subtitle,
    ...otherProps
}) {
    const closeButtonClassName = classnames("thc-c-drawer__header-button", closeButtonClassNameProp);

    return (
        <MDrawer {...otherProps} onClose={onClose}>
            <div className="thc-c-drawer__header">
                <ButtonIcon {...closeButtonProps} className={closeButtonClassName} onClick={onClose} type="secondary">
                    arrow-right
                </ButtonIcon>
                <div className="thc-c-drawer__header-titles">
                    <div className="thc-c-drawer__header-title thc-u-text--title">{title}</div>
                    {subtitle && <div className="thc-c-drawer__header-subtitle thc-u-text--subtitle">{subtitle}</div>}
                </div>
            </div>
            {alterElement(children, { className: "thc-c-drawer__content" })}
        </MDrawer>
    );
}

Drawer.propTypes = {
    /**
     * Additional className for close button
     */
    closeButtonClassName: PropTypes.string,
    /**
     * Additional props for close button
     */
    closeButtonProps: PropTypes.shape(ButtonIcon.propTypes),
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Close handler
     */
    onClose: PropTypes.func.isRequired,
    /**
     * Title for Drawer
     */
    title: PropTypes.string,
    /**
     * Subtitle for Drawer
     */
    subtitle: PropTypes.string,
    /**
     * Other props from base Drawer
     */
    ...Drawer.propTypes,
};
