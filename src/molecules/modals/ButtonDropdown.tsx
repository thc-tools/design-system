// Libs
import classnames from "classnames";
import { useRef, useState } from "react";

// Components
import { ButtonIcon, ButtonIconProps } from "../buttons";
import { Icons } from "../icons";
import { List, ListItem, ListItemIcon, ListItemProps, ListItemText, ListProps } from "../lists";
import { AnchorOrigin, Dropdown, DropdownProps } from "./Dropdown";

const DEFAULT_ANCHOR_ORIGIN: AnchorOrigin = { vertical: "bottom", horizontal: "left" };
const DEFAULT_TRANSFORM_ORIGIN: AnchorOrigin = { vertical: "top", horizontal: "left" };

export interface DropdownAction {
    /**
     * Click handler
     */
    action: () => void | Promise<void>;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Icon for action
     */
    icon?: Icons;
    /**
     * Key for react
     */
    key: number | string;
    /**
     * Label for action
     */
    label?: string;
}

export interface ButtonDropdown {
    /**
     * Actions
     */
    actions: DropdownAction[];
    /**
     * Additional className for every action
     */
    actionClassName?: string;
    /**
     * Additional props for every action
     */
    actionProps?: ListItemProps;
    /**
     * Anchor origin
     */
    anchorOrigin: DropdownProps["anchorOrigin"];
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional className for dropdown
     */
    dropdownClassName?: string;
    /**
     * Additional props for dropdown
     */
    dropdownProps?: DropdownProps;
    /**
     * Additional className for list
     */
    listClassName?: string;
    /**
     * Additional props for list
     */
    listProps?: ListProps;
    /**
     * Additional className for more button
     */
    moreButtonClassName?: string;
    /**
     * Additional props for more button
     */
    moreButtonProps?: ButtonIconProps;
    /**
     * Transform origin
     */
    transformOrigin?: DropdownProps["transformOrigin"];
}

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
}: ButtonDropdown) {
    const rootClassName = classnames("thc-c-button-dropdown", className);

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <div className={rootClassName}>
            <ButtonIcon
                {...moreButtonProps}
                className={moreButtonClassName}
                onClick={() => setOpen(!open)}
                ref={anchorRef}
                type="secondary"
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
                            {action.icon && <ListItemIcon iconSize="s">{action.icon}</ListItemIcon>}
                            <ListItemText primary={action.label} />
                        </ListItem>
                    ))}
                </List>
            </Dropdown>
        </div>
    );
}
