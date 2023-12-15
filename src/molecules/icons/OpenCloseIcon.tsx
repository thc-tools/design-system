// Libs
import clsx from "clsx";

// Utils
import { wrapKeyUp, wrapPrevent } from "../../core/utils";

// Components
import { Icon, Icons } from "./Icon";

export interface OpenCloseIconProps {
    /**
     * Icon to animate
     */
    animatedIcon?: Icons;
    /**
     * Additional className
     */
    className?: string;
    /**
     * If disabled
     */
    disabled?: boolean;
    /**
     * Click handler
     */
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    /**
     * If is open
     */
    open?: boolean;
}

export function OpenCloseIcon({
    animatedIcon = "arrow-down",
    className,
    disabled = false,
    onClick,
    open = false,
    ...otherProps
}: OpenCloseIconProps) {
    const rootClassName = clsx(
        "ds-o-actionable",
        "ds-c-open-close-icon",
        {
            "ds-c-open-close-icon--open": open,
            "ds-c-open-close-icon--close": !open,
        },
        className
    );

    const handleClick = wrapPrevent(onClick, disabled);
    const handleKeyUp = wrapKeyUp(handleClick);

    return (
        <Icon
            {...otherProps}
            className={rootClassName}
            onKeyUp={handleKeyUp}
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            {animatedIcon}
        </Icon>
    );
}
