// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Icon, ICON_SIZE } from "./Icon";

export function OwnerMemberIcon({ className, owner = false }) {
    const rootClassName = classnames("thc-c-owner-member-icon", className);

    return (
        <div className={rootClassName}>
            <Icon size={ICON_SIZE.S}>user</Icon>
            {owner && (
                <Icon className="thc-c-owner-member-icon__owner-icon" size={ICON_SIZE.M}>
                    star
                </Icon>
            )}
        </div>
    );
}

OwnerMemberIcon.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * If is owner
     */
    owner: PropTypes.bool,
};
