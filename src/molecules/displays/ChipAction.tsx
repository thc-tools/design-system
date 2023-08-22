// Libs
import classnames from "classnames";

// Components
import { Chip, ChipProps } from "./Chip";

export interface ChipActionProps extends Omit<ChipProps, "color" | "type"> {}

export function ChipAction({ className, icon = "close", iconSize = "m", ...otherProps }: ChipActionProps) {
    const chipClassName = classnames("thc-c-chip--action", className);

    return (
        <Chip {...otherProps} className={chipClassName} color={null} icon={icon} iconSize={iconSize} type="action" />
    );
}
