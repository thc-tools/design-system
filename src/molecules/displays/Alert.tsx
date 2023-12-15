// Libs
import clsx from "clsx";
import React, { useState } from "react";
import { DESIGN_SYSTEM_COMMON_TK, DESIGN_SYSTEM_TRANSLATION_NAMESPACE, useTranslation } from "src/design-system/core";
import { Collapse } from "src/design-system/molecules/animations";
import { Button } from "src/design-system/molecules/buttons";
import { Icon, Icons } from "src/design-system/molecules/icons";

// Components

export type AlertVariant = "info" | "warning" | "error" | "success";

const ICON_MAP: Record<AlertVariant, Icons> = {
    error: "alert",
    info: "info",
    success: "confirm",
    warning: "warning",
};

export interface AlertProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Optional extra content
     */
    extraContent?: React.ReactNode;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Close handler
     */
    onClose?: () => void;
    /**
     * Title of alert
     */
    title?: string;
    /**
     * Show less key
     */
    showLessKey?: string;
    /**
     * Show more key
     */
    showMoreKey?: string;
    /**
     * Translation key
     */
    translationKey?: string;
    /**
     * Alert variant
     */
    variant?: AlertVariant;
}

export function Alert({
    children,
    className: classNameProp,
    extraContent,
    icon,
    onClose,
    showLessKey = "actions.show-less",
    showMoreKey = "actions.show-more",
    title,
    variant = "info",
    translationKey = `${DESIGN_SYSTEM_TRANSLATION_NAMESPACE}:${DESIGN_SYSTEM_COMMON_TK}`,
}: AlertProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const className = clsx("ds-c-alert", `ds-c-alert--${variant}`, classNameProp);
    const { t } = useTranslation(translationKey);

    return (
        <div className={className}>
            <div className="ds-c-alert__container">
                <Icon className="ds-c-alert__icon">{icon ?? ICON_MAP[variant]}</Icon>
                {(title || children) && (
                    <div className="ds-c-alert__content">
                        {title && <div className="ds-c-alert_title ds-u-typography--subtitle-medium">{title}</div>}
                        {children && <div className="ds-c-alert_body ds-u-typography--body">{children}</div>}
                    </div>
                )}
                {onClose && (
                    <Icon className="ds-c-alert__close" size="s" onClick={onClose}>
                        error
                    </Icon>
                )}
            </div>
            {extraContent && (
                <>
                    <Collapse in={open}>
                        <div className="ds-c-alert__extra-content ds-u-typography--body">{extraContent}</div>
                    </Collapse>
                    <Button className="ds-c-alert__more" onClick={() => setOpen(!open)} variant="ghost">
                        {open ? t(showLessKey) : t(showMoreKey)}
                    </Button>
                </>
            )}
        </div>
    );
}
