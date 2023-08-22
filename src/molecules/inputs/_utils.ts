import { trim } from "lodash";
import { Icons } from "../icons";

export interface FieldOption {
    /**
     * If is disabled
     */
    disabled?: boolean;
    /**
     * Error message
     */
    error?: string;
    /**
     * Icon
     */
    icon?: Icons;
    /**
     * Label
     */
    label?: string;
    /**
     * Secondary label
     */
    secondary?: string;
    /**
     * Value
     * */
    value: string | number | undefined;
    /**
     * Warning message
     */
    warning?: string;
}

export function trimOrNull(string: string | undefined): string | null {
    const trimmed = trim(string);
    return trimmed !== "" ? trimmed : null;
}

export function helperTextResolver(
    disabled: boolean,
    error: string | undefined,
    success: string | undefined,
    warning: string | undefined,
    helperText: string | undefined
) {
    let hasError = false;
    let hasWarning = false;
    let hasSuccess = false;
    let helperTextMessage;

    if (disabled) {
        helperTextMessage = helperText;
    } else if (trimOrNull(error)) {
        hasError = true;
        helperTextMessage = error;
    } else if (trimOrNull(warning)) {
        hasWarning = true;
        helperTextMessage = warning;
    } else if (trimOrNull(success)) {
        hasSuccess = true;
        helperTextMessage = success;
    } else if (trimOrNull(helperText)) {
        helperTextMessage = helperText;
    }

    return {
        hasError,
        hasSuccess,
        hasWarning,
        helperTextMessage,
    };
}

export function getLabelFromOptions(options: FieldOption[], value: number | string | undefined): string | null {
    if (!options?.length) {
        return null;
    }

    return options.find((opt) => opt.value === value)?.label ?? null;
}
