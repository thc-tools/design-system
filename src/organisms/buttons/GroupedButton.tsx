// Libs
import clsx from "clsx";
import React from "react";

// Components
import { Button, ButtonProps } from "src/design-system/molecules/buttons";
import { Icons } from "src/design-system/molecules/icons";
import { DropdownProps } from "src/design-system/molecules/modals";
import { ButtonDropdown, DropdownAction } from "src/design-system/organisms/buttons/ButtonDropdown";

export interface GroupedButtonProps extends ButtonProps {
    /**
     * Actions to fill the dropdown
     */
    actions?: DropdownAction[];
    /**
     * Drop down props
     */
    dropdownProps?: Partial<Omit<DropdownProps, "open" | "onClick">>;
    /**
     * Additional left button className
     */
    leftButtonClassName?: string;
    /**
     * Right button props
     */
    rightButtonProps?: Omit<ButtonDropdown, "onClick" | "disabled" | "onClick" | "label" | "actions">;
    /**
     * Addition right button className
     */
    rightButtonClassName?: string;
    /**
     * Icon displayed with the button
     */
    rightIcon?: Icons;
}

export const GroupedButton = React.forwardRef<HTMLDivElement, GroupedButtonProps>(function GroupedButton(
    {
        actions,
        className: classNameProp,
        label,
        icon,
        leftButtonClassName: leftButtonClassNameProp,
        onClick,
        rightButtonClassName: rightButtonClassNameProp,
        rightButtonProps,
        rightIcon = "drop",
        dropdownProps,
        ...buttonProps
    },
    ref
): JSX.Element {
    const className = clsx("ds-c-grouped-button", classNameProp);
    const leftButtonClassName = clsx("ds-c-grouped-button__button-left", leftButtonClassNameProp);
    const rightButtonClassName = clsx("ds-c-grouped-button__button-right", rightButtonClassNameProp);

    return (
        <div className={className} ref={ref}>
            <Button {...buttonProps} label={label} className={leftButtonClassName} icon={icon} onClick={onClick} />
            <ButtonDropdown
                actions={actions}
                icon={rightIcon}
                moreButtonProps={buttonProps}
                moreButtonClassName={rightButtonClassName}
                dropdownProps={dropdownProps}
                {...rightButtonProps}
            />
        </div>
    );
});
