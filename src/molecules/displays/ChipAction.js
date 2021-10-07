// Libs
import React from "react";
import classnames from "classnames";
import { omit } from "lodash";

// Components
import { ICON_SIZE } from "../icons";
import { Chip, CHIP_TYPES } from "./Chip";

export function ChipAction({ className, icon = "close", iconSize = ICON_SIZE.M, ...otherProps }) {
    const chipClassName = classnames("thc-c-chip--action", className);

    return (
        <Chip
            {...otherProps}
            className={chipClassName}
            color={null}
            icon={icon}
            iconSize={iconSize}
            type={CHIP_TYPES.ACTION}
        />
    );
}

ChipAction.propTypes = {
    ...omit(Chip.propTypes, ["color", "type"]),
};
