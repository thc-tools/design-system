export function getOffsetTop(rect, vertical) {
    if (vertical === "center") {
        return rect.height / 2;
    }
    if (vertical === "bottom") {
        return rect.height;
    }
    if (typeof vertical === "number") {
        return vertical;
    }

    return 0;
}

export function getOffsetLeft(rect, horizontal) {
    if (horizontal === "center") {
        return rect.width / 2;
    }
    if (horizontal === "right") {
        return rect.width;
    }
    if (typeof horizontal === "number") {
        return horizontal;
    }

    return 0;
}

export function getTransformOriginValue(transformOrigin) {
    return [transformOrigin.horizontal, transformOrigin.vertical].map((n) => (typeof n === "number" ? `${n}px` : n)).join(" ");
}
