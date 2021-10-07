import { trim } from "lodash";

export function trimOrNull(string) {
    const trimmed = trim(string);
    return trimmed !== "" ? trimmed : null;
}

export function helperTextResolver(disabled, error, success, warning, helperText) {
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
