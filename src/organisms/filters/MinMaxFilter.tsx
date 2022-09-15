// Libs
import clsx from "clsx";

// Components
import { BaseDropdownFilter } from "src/design-system/organisms/filters/BaseDropdownFilter";
import { MinMaxInputs, MinMaxInputsProps } from "src/design-system/molecules/inputs/MinMaxInputs";

export interface MinMaxFilterProps extends MinMaxInputsProps {
    /**
     * Label to display in filter
     */
    label?: string;
}

export function MinMaxFilter({
    className: classNameProp,
    disabled,
    icon,
    name,
    label,
    ...otherProps
}: MinMaxFilterProps): JSX.Element {
    const className = clsx("ds-c-min-max-filter", classNameProp);

    return (
        <BaseDropdownFilter className={className} disabled={disabled} icon={icon} name={name} label={label}>
            <MinMaxInputs {...otherProps} />
        </BaseDropdownFilter>
    );
}
