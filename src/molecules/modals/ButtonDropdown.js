// Libs
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { ButtonIcon, BUTTON_TYPES } from "../buttons";
import { ICON_SIZE } from "../icons";
import { List, ListItem, ListItemIcon, ListItemText } from "../lists";
import { Dropdown } from "./Dropdown";

const DEFAULT_ANCHOR_ORIGIN = { vertical: "bottom", horizontal: "left" };
const DEFAULT_TRANSFORM_ORIGIN = { vertical: "top", horizontal: "left" };

export function ButtonDropdown({
    actions = [],
    actionClassName,
    actionProps,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    className,
    dropdownClassName,
    dropdownProps,
    listClassName,
    listProps,
    moreButtonClassName,
    moreButtonProps,
    transformOrigin = DEFAULT_TRANSFORM_ORIGIN,
}) {
    const rootClassName = classnames("thc-c-button-dropdown", className);

    const [open, setOpen] = useState(false);
    const anchorRef = useRef();

    return (
        <div className={rootClassName}>
            <ButtonIcon
                {...moreButtonProps}
                className={moreButtonClassName}
                onClick={() => setOpen(!open)}
                ref={anchorRef}
                type={BUTTON_TYPES.SECONDARY}
            >
                more-h
            </ButtonIcon>
            <Dropdown
                {...dropdownProps}
                anchorEl={anchorRef}
                anchorOrigin={anchorOrigin}
                className={dropdownClassName}
                open={open}
                onClose={() => setOpen(false)}
                transformOrigin={transformOrigin}
            >
                <List {...listProps} className={listClassName}>
                    {actions.map((action) => (
                        <ListItem
                            {...actionProps}
                            className={actionClassName}
                            condensed
                            disabled={action.disabled}
                            key={action.key ?? action.label}
                            onClick={() => {
                                setOpen(false);
                                action.action();
                            }}
                        >
                            {action.icon && <ListItemIcon iconSize={ICON_SIZE.S}>{action.icon}</ListItemIcon>}
                            <ListItemText primary={action.label} />
                        </ListItem>
                    ))}
                </List>
            </Dropdown>
        </div>
    );
}

ButtonDropdown.propTypes = {
    /**
     * Actions
     */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Click handler
             */
            action: PropTypes.func,
            /**
             * If is disabled
             */
            disabled: PropTypes.bool,
            /**
             * Icon for action
             */
            icon: PropTypes.string,
            /**
             * Key for react
             */
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            /**
             * Label for action
             */
            label: PropTypes.string,
        })
    ),
    /**
     * Additional className for every action
     */
    actionClassName: PropTypes.string,
    /**
     * Additional props for every action
     */
    actionProps: PropTypes.shape(ListItem.propTypes),
    /**
     * Anchor origin
     */
    anchorOrigin: Dropdown.propTypes.anchorOrigin,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Additional className for dropdown
     */
    dropdownClassName: PropTypes.string,
    /**
     * Additional props for dropdown
     */
    dropdownProps: PropTypes.shape(Dropdown.propTypes),
    /**
     * Additional className for list
     */
    listClassName: PropTypes.string,
    /**
     * Additional props for list
     */
    listProps: PropTypes.shape(List.propTypes),
    /**
     * Additional className for more button
     */
    moreButtonClassName: PropTypes.string,
    /**
     * Additional props for more button
     */
    moreButtonProps: PropTypes.shape(ButtonIcon.propTypes),
    /**
     * Transform origin
     */
    transformOrigin: Dropdown.propTypes.transformOrigin,
};
