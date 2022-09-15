// Libs
import clsx from "clsx";
import React from "react";

// Utils

// Components
import { Icons } from "src/design-system/molecules/icons";
import { ListItemProps, ListProps } from "src/design-system/molecules/lists";
import { DropdownProps } from "src/design-system/molecules/modals";
import { ButtonDropdown } from "src/design-system/organisms/buttons/ButtonDropdown";
import { Button, ButtonIcon, ButtonIconProps, ButtonVariant } from "../buttons";

interface HeaderAction {
    /**
     * Click handler
     */
    action: () => void;
    /**
     * Type of button
     */
    buttonType: "standard" | "icon";
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
    key: string;
    /**
     * Label for action
     */
    label?: string;
    /**
     * Type of button
     */
    type?: ButtonVariant;
}

function renderAction(
    actionButtonClassName: string,
    actionButtonProps: ListItemProps | undefined,
    actionProp: HeaderAction
) {
    if (React.isValidElement(actionProp)) {
        return actionProp;
    }

    const { action, buttonType = "standard", key, label, type = "outlined", ...otherProps } = actionProp;
    const ButtonComponent = buttonType === "icon" ? ButtonIcon : Button;

    return (
        <ButtonComponent
            {...actionButtonProps}
            {...otherProps}
            className={actionButtonClassName}
            key={key ?? label}
            onClick={action}
            variant={type}
        >
            {label}
        </ButtonComponent>
    );
}

export interface HeaderProps extends React.PropsWithChildren<unknown> {
    /**
     * Actions to display
     */
    actions: HeaderAction[];
    /**
     * Additional className for action buttons
     */
    actionButtonClassName?: string;
    /**
     * Additional props for action buttons
     */
    actionButtonProps?: ListItemProps;
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional className for Dropdown
     */
    dropdownClassName?: string;
    /**
     * Additional props for Dropdown
     */
    dropdownProps?: DropdownProps;
    /**
     * Additional className for List
     */
    listClassName?: string;
    /**
     * Additional prop for List
     */
    listProps?: ListProps;
    /**
     * Additional className for MoreButton
     */
    moreButtonClassName?: string;
    /**
     * Additional props for MoreButton
     */
    moreButtonProps?: ButtonIconProps;
    /**
     * Additional tabs
     */
    tabs?: React.ReactNode;
}

export function Header({
    actions = [],
    actionButtonClassName: actionButtonClassNameProp,
    actionButtonProps,
    children,
    className,
    dropdownClassName: dropdownClassNameProp,
    dropdownProps,
    listClassName: listClassNameProp,
    listProps,
    moreButtonClassName: moreButtonClassNameProp,
    moreButtonProps,
    tabs,
    ...otherProps
}) {
    const actionButtonClassName = clsx("ds-c-header__action-button", actionButtonClassNameProp);
    const dropdownClassName = clsx("ds-c-header__dropdown", dropdownClassNameProp);
    const listClassName = clsx("ds-c-header__list", listClassNameProp);
    const moreButtonClassName = clsx("ds-c-header__more-button", moreButtonClassNameProp);

    let actionNode;
    if (actions.length > 3) {
        actionNode = (
            <>
                {actions.slice(0, 2).map((action) => renderAction(actionButtonClassName, actionButtonProps, action))}
                <ButtonDropdown
                    actions={actions.slice(2)}
                    actionClassName={actionButtonClassName}
                    actionProps={actionButtonProps}
                    dropdownClassName={dropdownClassName}
                    dropdownProps={dropdownProps}
                    listClassName={listClassName}
                    listProps={listProps}
                    moreButtonClassName={moreButtonClassName}
                    moreButtonProps={moreButtonProps}
                />
            </>
        );
    } else if (actions.length > 0) {
        actionNode = actions.map((action) => renderAction(actionButtonClassName, actionButtonProps, action));
    }

    return (
        <div className={className}>
            <div {...otherProps} className="ds-o-paper ds-c-header">
                <div className="ds-c-header__content">{children}</div>
                {actionNode && <div className="ds-c-header__actions">{actionNode}</div>}
            </div>
            {tabs}
        </div>
    );
}
