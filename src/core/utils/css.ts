import { isEmpty } from "lodash";

export function getCSSVariable(variableName, element = document.body) {
    if (isEmpty(variableName) || !variableName.startsWith("--thc")) {
        throw new Error("You have to give a valid css variable name like: --thc-a-css-variable");
    }

    return window.getComputedStyle(element).getPropertyValue(variableName);
}

export function setCSSVariable(variableName, value, element = document.body) {
    if (isEmpty(variableName) || !variableName.startsWith("--thc")) {
        throw new Error("You have to give a valid css variable name like: --thc-a-css-variable");
    }

    return window.getComputedStyle(element).setProperty(variableName, value);
}

export function convertHexToRGBA(hex, alpha = 1) {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
}

export function convertPxToNumber(pixelString) {
    return Number.parseInt(pixelString?.replace("px", "").trim(), 10);
}
