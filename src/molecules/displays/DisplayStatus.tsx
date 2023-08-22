// Libs
import classnames from "classnames";

// Components
import { StatusEnum, THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY, useTranslation } from "../../core";
import { IconWrapper, IconWrapperProps, Icons } from "../icons";

export const DISPLAY_STATUS_TRANSLATION_KEY = "thc.displays.display-status";

export const DISPLAY_STATUS_ICONS: Record<StatusEnum, Icons> = {
    [StatusEnum.Draft]: "clipboard",
    [StatusEnum.InProgress]: "hourglass",
    [StatusEnum.Paused]: "pause",
    [StatusEnum.Done]: "success",
    [StatusEnum.Failed]: "error",
};

export function isValidStatus(status: StatusEnum): boolean {
    return Object.values(StatusEnum).includes(status);
}

export interface DisplayStatusProps {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Additional className for Icon
     */
    iconClassName?: string;
    /**
     * Additional props for Icon
     */
    iconProps?: IconWrapperProps;
    /**
     * Status
     */
    status: StatusEnum;
    /**
     * Translation key
     */
    translationKey?: string;
}

export function DisplayStatus({
    className,
    iconClassName: iconClassNameProp,
    iconProps,
    status,
    translationKey,
    ...otherProps
}: DisplayStatusProps) {
    const { translate: translateDisplay } = useTranslation(translationKey ?? DISPLAY_STATUS_TRANSLATION_KEY);
    const { translate: translateCommon } = useTranslation(translationKey ?? THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY);

    const rootClassName = classnames(
        "thc-c-display-status",
        {
            "thc-c-display-status--draft": status === StatusEnum.Draft,
            "thc-c-display-status--inProgress": status === StatusEnum.InProgress,
            "thc-c-display-status--paused": status === StatusEnum.Paused,
            "thc-c-display-status--done": status === StatusEnum.Done,
            "thc-c-display-status--failed": status === StatusEnum.Failed,
        },
        className
    );

    const iconClassName = classnames("thc-c-display-status__icon", iconClassNameProp);

    if (!DISPLAY_STATUS_ICONS[status]) {
        return <span className="thc-u-status--error">{translateDisplay("unknown-status")}</span>;
    }

    return (
        <div {...otherProps} className={rootClassName}>
            <IconWrapper {...iconProps} className={iconClassName} icon={DISPLAY_STATUS_ICONS[status]}>
                <span>{translateCommon(`enums.STATUS_ENUM.${status}`)}</span>
            </IconWrapper>
        </div>
    );
}
