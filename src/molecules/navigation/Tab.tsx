// Libs
import clsx from "clsx";
import React, { useCallback } from "react";

// Utils
import { wrapLabel } from "../../core/utils";

// Components
import { Chip } from "src/design-system/molecules/displays";
import { Button } from "../buttons";
import { IconPosition, IconSize, IconWrapper, IconWrapperProps, Icons } from "../icons";

export interface TabProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Counter displayed at the end
     */
    countAdornment?: number;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Additional className for Icon
     */
    iconClassName?: string;
    /**
     * Position for Icon
     */
    iconPosition?: IconPosition;
    /**
     * Additional prop for Icon
     */
    iconProps?: IconWrapperProps;
    /**
     * Size for Icon
     */
    iconSize?: IconSize;
    /**
     * Indicator
     */
    indicator?: React.ReactNode;
    /**
     * Label
     */
    label?: string;
    /**
     * Additional className for label
     */
    labelClassName?: string;
    /**
     * Change handler
     */
    onChange?: (value: number | string, event?: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * If is selected
     */
    selected?: boolean;
    /**
     * Typography className
     */
    typographyClassName?: string;
    /**
     * Typography className fora active sate
     */
    typographyActiveClassName?: string;
    /**
     * Value
     */
    value?: number | string;
}

export function Tab({
    children,
    className,
    countAdornment,
    disabled = false,
    icon,
    iconClassName: iconClassNameProp,
    iconPosition,
    iconProps,
    iconSize,
    indicator,
    label,
    labelClassName: labelClassNameProp,
    onChange,
    onClick,
    selected,
    typographyClassName = "ds-u-typography--subtitle",
    typographyActiveClassName = "ds-u-typography--subtitle-medium",
    value,
    ...otherProps
}: TabProps): JSX.Element {
    const rootClassName = clsx(
        "ds-c-tab",
        {
            "ds-c-tab--disabled": disabled,
            "ds-c-tab--selected": selected,
        },
        className
    );
    const iconClassName = clsx("ds-c-tab__icon", iconClassNameProp);
    const iconPropsClassName = clsx({ "ds-c-tabs__icon--selected": selected === true });
    const labelClassName = clsx(
        "ds-c-tab__label",
        {
            [typographyClassName]: !selected,
            [typographyActiveClassName]: selected,
        },
        labelClassNameProp
    );

    const handleClick = useCallback(
        (event) => {
            if (!selected && onChange) {
                onChange(value, event);
            }

            if (onClick) {
                onClick(event);
            }
        },
        [selected, onChange, onClick, value]
    );

    const child = wrapLabel(label ?? children);

    return (
        <Button {...otherProps} className={rootClassName} disabled={disabled} onClick={handleClick} variant="tab">
            <span className="ds-c-tab__wrapper">
                <IconWrapper
                    {...iconProps}
                    iconProps={{ className: iconPropsClassName }}
                    className={iconClassName}
                    icon={icon}
                    position={iconPosition}
                    size={iconSize}
                >
                    <div className="ds-o-flex ds-o-flex--spaced">
                        <span className={labelClassName}>{child}</span>
                        {countAdornment !== undefined && <Chip label={countAdornment.toString()} type="outlined" />}
                    </div>
                </IconWrapper>
            </span>
            {indicator}
        </Button>
    );
}
