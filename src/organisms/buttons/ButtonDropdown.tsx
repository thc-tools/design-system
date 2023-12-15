// Libs
import clsx from "clsx";
import { useRef, useState } from "react";

// Utils
import { AnchorOrigin, Dropdown, DropdownProps } from "src/design-system/molecules/modals/Dropdown";

// Components
import { isNil } from "lodash";
import { Button } from "src/design-system/molecules/buttons";
import { ButtonIcon, ButtonIconProps } from "src/design-system/molecules/buttons/ButtonIcon";
import { Icons } from "src/design-system/molecules/icons";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemProps,
    ListItemText,
    ListProps,
} from "src/design-system/molecules/lists";

const DEFAULT_ANCHOR_ORIGIN: AnchorOrigin = { vertical: "bottom", horizontal: "left" };
const DEFAULT_TRANSFORM_ORIGIN: AnchorOrigin = { vertical: "top", horizontal: "left" };

export interface DropdownAction {
    /**
     * Click handler
     */
    action?: () => void | Promise<void>;
    /**
     * Classname of each action item
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Icon for action
     */
    icon?: Icons;
    /**
     * If is group title take content and don't use actionable class
     */
    isGroupTitle?: boolean;
    /**
     * Key for react
     */
    key: number | string;
    /**
     * Label for action
     */
    label?: string;
    /**
     * SecondaryLabel for action
     */
    secondaryLabel?: string;
    /**
     * Content for action
     */
    content?: React.ReactNode;
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
    anchorOrigin?: DropdownProps["anchorOrigin"];
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
    dropdownProps?: Partial<DropdownProps>;
    /**
     * Label of the button
     */
    label?: string;
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
    /**
     * button Icon
     */
    icon?: Icons;
}

export function ButtonDropdown({
    actions = [],
    actionClassName,
    actionProps,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    className,
    dropdownClassName,
    dropdownProps,
    label,
    listClassName,
    listProps,
    moreButtonClassName,
    moreButtonProps,
    transformOrigin = DEFAULT_TRANSFORM_ORIGIN,
    icon = "drop",
}: ButtonDropdown): JSX.Element {
    const rootClassName = clsx("ds-c-button-dropdown", className);

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const listItemClassName = clsx("ds-c-button-drop-down--item-list", actionClassName);

    return (
        <div className={rootClassName}>
            {!isNil(label) && (
                <Button
                    icon={icon}
                    iconPosition="right"
                    {...moreButtonProps}
                    className={moreButtonClassName}
                    onClick={() => setOpen(!open)}
                    ref={anchorRef}
                >
                    {label}
                </Button>
            )}
            {isNil(label) && (
                <ButtonIcon
                    {...moreButtonProps}
                    className={moreButtonClassName}
                    onClick={() => setOpen(!open)}
                    ref={anchorRef}
                >
                    {icon}
                </ButtonIcon>
            )}

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
                            className={clsx(listItemClassName, action.className)}
                            condensed
                            disabled={action.disabled}
                            key={action.key ?? action.label}
                            onClick={
                                action.isGroupTitle
                                    ? undefined
                                    : () => {
                                          setOpen(false);
                                          action?.action();
                                      }
                            }
                        >
                            {action.content ?? (
                                <>
                                    {action.icon && <ListItemIcon iconSize="m">{action.icon}</ListItemIcon>}
                                    <ListItemText primary={action.label} secondary={action.secondaryLabel} />
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Dropdown>
        </div>
    );
}
