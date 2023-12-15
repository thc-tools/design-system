// Libs
import clsx from "clsx";
import { Select, SelectProps } from "src/design-system/molecules/inputs";

export interface SelectFilterProps extends SelectProps {
    onChange: (values) => void;
    value;
    options;
}

export function SelectFilter({
    className: classNameProp,
    onChange,
    value,
    options,
    ...otherProps
}: SelectFilterProps): JSX.Element {
    const className = clsx("ds-c-filter", classNameProp);

    return (
        <Select
            {...otherProps}
            className={className}
            inputProps={{
                inputClassName: "ds-u-typography--body",
                inputProps: {
                    size: 15,
                },
            }}
            onChange={onChange}
            value={value}
            options={options}
        />
    );
}
