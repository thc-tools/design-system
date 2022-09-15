// Libs
import clsx from "clsx";
import { compact, isNil } from "lodash";
import React from "react";

// Components
import { Icons } from "src/design-system/molecules/icons";
import { Input, InputProps } from "src/design-system/molecules/inputs";

export interface BaseFilterProps extends Partial<InputProps> {
    /**
     * Additional classNAme
     */
    className?: string;
    /**
     * If has counter
     */
    count?: number;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Label for filter
     */
    label?: string;
    /**
     * Click handler
     */
    onClick?: () => void;
    /**
     * Input name
     */
    name: string;
}

export const BaseFilter = React.forwardRef<HTMLDivElement, BaseFilterProps>(function BaseFilter(
    { className: classNameProp, count, icon, label, name, onClick, ...otherProps },
    ref
): JSX.Element {
    const className = clsx("ds-c-filter", classNameProp);
    return (
        <Input
            containerRef={ref}
            InputComponent="div"
            {...otherProps}
            className={className}
            endAdornment="arrow-dropdown"
            inputClassName="ds-u-typography--body"
            name={name}
            onClick={onClick}
            startAdornment={icon}
            type="text"
            value={compact([label, !isNil(count) ? `(${count})` : null]).join(" ")}
        />
    );
});
