// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { useTranslation, STATUS_ENUM, THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY } from "../../core";
import { IconWrapper } from "../icons";

export const DISPLAY_STATUS_TRANSLATION_KEY = "thc.displays.display-status";

export const DISPLAY_STATUS_ICONS = {
    [STATUS_ENUM.DRAFT]: "clipboard",
    [STATUS_ENUM.IN_PROGRESS]: "hourglass",
    [STATUS_ENUM.PAUSED]: "pause",
    [STATUS_ENUM.DONE]: "success",
    [STATUS_ENUM.FAILED]: "error",
};

export function isValidStatus(status) {
    return Object.values(STATUS_ENUM).includes(status);
}

export function DisplayStatus({
    className,
    iconClassName: iconClassNameProp,
    iconProps,
    status,
    translationKey,
    ...otherProps
}) {
    const { translate: translateDisplay } = useTranslation(translationKey ?? DISPLAY_STATUS_TRANSLATION_KEY);
    const { translate: translateCommon } = useTranslation(translationKey ?? THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY);

    const rootClassName = classnames(
        "thc-c-display-status",
        {
            "thc-c-display-status--draft": status === STATUS_ENUM.DRAFT,
            "thc-c-display-status--inProgress": status === STATUS_ENUM.IN_PROGRESS,
            "thc-c-display-status--paused": status === STATUS_ENUM.PAUSED,
            "thc-c-display-status--done": status === STATUS_ENUM.DONE,
            "thc-c-display-status--failed": status === STATUS_ENUM.FAILED,
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

DisplayStatus.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Additional className for Icon
     */
    iconClassName: PropTypes.string,
    /**
     * Additional props for Icon
     */
    iconProps: PropTypes.shape(IconWrapper.propTypes),
    /**
     * Status
     */
    status: PropTypes.oneOf(Object.values(STATUS_ENUM)),
    /**
     * Translation key
     */
    translationKey: PropTypes.string,
};
