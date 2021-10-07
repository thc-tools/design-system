// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Utils

// Components
import { Button, ButtonIcon, BUTTON_TYPES } from "../buttons";
import { List } from "../lists";
import { ButtonDropdown } from "../modals";

function renderAction(actionButtonClassName, actionButtonProps, actionProp) {
    if (React.isValidElement(actionProp)) {
        return actionProp;
    }

    const { action, buttonType = "standard", key, label, type = BUTTON_TYPES.SECONDARY, ...otherProps } = actionProp;
    const ButtonComponent = buttonType === "icon" ? ButtonIcon : Button;

    return (
        <ButtonComponent
            {...actionButtonProps}
            {...otherProps}
            className={actionButtonClassName}
            key={key ?? label}
            onClick={action}
            type={type}
        >
            {label}
        </ButtonComponent>
    );
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
    const actionButtonClassName = classnames("thc-c-header__action-button", actionButtonClassNameProp);
    const dropdownClassName = classnames("thc-c-header__dropdown", dropdownClassNameProp);
    const listClassName = classnames("thc-c-header__list", listClassNameProp);
    const moreButtonClassName = classnames("thc-c-header__more-button", moreButtonClassNameProp);

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
            <div {...otherProps} className="thc-o-paper thc-c-header">
                <div className="thc-c-header__content">{children}</div>
                {actionNode && <div className="thc-c-header__actions">{actionNode}</div>}
            </div>
            {tabs}
        </div>
    );
}

Header.propTypes = {
    /**
     * Actions to display
     */
    actions: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.shape({
                /**
                 * Click handler
                 */
                action: PropTypes.func,
                /**
                 * Type of button
                 */
                buttonType: PropTypes.oneOf(["standard", "icon"]),
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
                /**
                 * Type of button
                 */
                type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
            }),
        ])
    ),
    /**
     * Additional className for action buttons
     */
    actionButtonClassName: PropTypes.string,
    /**
     * Additional props for action buttons
     */
    actionButtonProps: PropTypes.shape(Button.propTypes),
    /**
     * Children (left part)
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Additional className for Dropdown
     */
    dropdownClassName: PropTypes.string,
    /**
     * Additional props for Dropdown
     */
    // dropdownProps: PropTypes.shape(Dropdown.propTypes), It makes it crash...
    /**
     * Additional className for List
     */
    listClassName: PropTypes.string,
    /**
     * Additional prop for List
     */
    listProps: PropTypes.shape(List.propTypes),
    /**
     * Additional className for MoreButton
     */
    moreButtonClassName: PropTypes.string,
    /**
     * Additional props for MoreButton
     */
    moreButtonProps: PropTypes.shape(ButtonIcon.propTypes),
};
