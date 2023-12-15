import { isEmpty } from "lodash";

export function getCSSVariable(variableName: string, element = document.body) {
    if (isEmpty(variableName) || !variableName.startsWith("--ds")) {
        throw new Error("You have to give a valid css variable name like: --ds-a-css-variable");
    }

    return window.getComputedStyle(element).getPropertyValue(variableName);
}

export function setCSSVariable(variableName: string, value: string | null, element = document.body) {
    if (isEmpty(variableName) || !variableName.startsWith("--ds")) {
        throw new Error("You have to give a valid css variable name like: --ds-a-css-variable");
    }

    return window.getComputedStyle(element).setProperty(variableName, value);
}

export function convertHexToRGBA(hex: string, alpha = 1) {
    const [r, g, b] = (hex.match(/\w\w/g) ?? []).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
}

export function convertPxToNumber(pixelString: string) {
    return Number.parseInt(pixelString?.replace("px", "").trim(), 10);
}
