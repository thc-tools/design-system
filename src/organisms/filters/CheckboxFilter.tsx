// Types
import { FieldOption, guessOptionType } from "src/design-system/molecules/inputs/_utils";

// Components
import { useCallback } from "react";
import { Icons } from "src/design-system/molecules/icons";
import { Checkbox } from "src/design-system/molecules/inputs";
import { List, ListItem, ListItemActions, ListItemIcon, ListItemText } from "src/design-system/molecules/lists";
import { BaseDropdownFilter } from "src/design-system/organisms/filters/BaseDropdownFilter";

export interface CheckboxFilterProps<U = string | number, V = U[]> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Label
     */
    label?: string;
    /**
     * Name
     */
    name: string;
    /**
     * Change handler
     */
    onChange: (values: V) => void;
    /**
     * Options for fiels
     */
    options: FieldOption<U>[];
    /**
     * Value
     */
    value?: V;
}

export function CheckboxFilter({
    className,
    disabled = false,
    icon,
    label,
    name,
    onChange,
    options,
    value = [],
}: CheckboxFilterProps): JSX.Element {
    const handleChange = useCallback(
        (cValue) => {
            if (onChange) {
                let checkboxValue = cValue;
                if (guessOptionType(options, checkboxValue) === "number") {
                    checkboxValue = Number.parseInt(checkboxValue, 10);
                }
                const newValue = value.includes(checkboxValue)
                    ? value.filter((v) => v !== checkboxValue)
                    : [...value, checkboxValue];

                onChange(newValue);
            }
        },
        [onChange, value]
    );

    return (
        <BaseDropdownFilter
            className={className}
            count={options.filter((opt) => value.includes(opt.value)).length}
            disabled={disabled}
            icon={icon}
            label={label}
            name={name}
            noSpacing
        >
            <List>
                {options.map(({ value: cValue, disabled, icon, label, secondary }) => (
                    <ListItem key={cValue} disabled={disabled} onClick={() => handleChange(cValue)} condensed>
                        <ListItemActions>
                            <Checkbox
                                name={name}
                                value={cValue}
                                checked={value.includes(cValue)}
                                onChange={(event) => handleChange(event.target.value)}
                            />
                        </ListItemActions>
                        {icon && <ListItemIcon icon={icon} />}
                        <ListItemText primary={label} secondary={secondary} />
                    </ListItem>
                ))}
            </List>
        </BaseDropdownFilter>
    );
}
