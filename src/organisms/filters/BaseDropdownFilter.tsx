// Libs
import clsx from "clsx";
import React, { useRef } from "react";
import { useFocus } from "src/design-system/core/hooks";
import { Icons } from "src/design-system/molecules/icons";
import { Dropdown } from "src/design-system/molecules/modals";
import { BaseFilter } from "src/design-system/organisms/filters/BaseFilter";

// Components

export interface BaseDropdownFilterProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Filter count
     */
    count?: number;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Additional className
     */
    dropdownClassName?: string;
    /**
     * Filter icon
     */
    icon?: Icons;
    /**
     * Filter label
     */
    label?: string;
    /**
     * Filter name
     */
    name: string;
    /**
     * If dropwndown is without spacing
     */
    noSpacing?: boolean;
    /**
     * On close callback
     */
    onClose?: () => void;
}

export function BaseDropdownFilter({
    children,
    className: classNameProp,
    count,
    dropdownClassName: dropdownClassNameProp,
    icon,
    label,
    name,
    noSpacing = false,
    disabled,
    onClose: onCloseProps,
}: BaseDropdownFilterProps): JSX.Element {
    const className = clsx("ds-c-base-dropdown-filter", classNameProp);
    const dropdownClassName = clsx(
        "ds-c-base-dropdown-filter__dropdown",
        { "ds-c-base-dropdown-filter__dropdown--spaced": !noSpacing },
        dropdownClassNameProp
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const { focus: open, setFocus: setOpen, _handleFocus } = useFocus(disabled);

    const onClose = () => {
        setOpen(false);
        onCloseProps?.();
    };

    return (
        <>
            <BaseFilter
                className={className}
                name={name}
                count={count}
                icon={icon}
                label={label}
                onClick={() => setOpen(true)}
                onFocus={_handleFocus}
                ref={inputRef}
                disabled={disabled}
            />
            <Dropdown
                contentClassName={dropdownClassName}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                anchorEl={inputRef}
                open={open}
                onClose={onClose}
            >
                {children}
            </Dropdown>
        </>
    );
}
