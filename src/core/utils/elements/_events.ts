// https://facebook.github.io/react/docs/events.html#supported-events
export const clipboardEvents = ["onCopy", "onCut", "onPaste"];
export const compositionEvents = ["onCompositionEnd", "onCompositionStart", "onCompositionUpdate"];
export const keyboardEvent = ["onKeyDown", "onKeyPress", "onKeyUp"];
export const focusEvents = ["onFocus", "onBlur"];
export const formEvents = ["onChange", "onInput", "onInvalid", "onSubmit"];
// prettier-ignore
export const mouseEvents = [
    "onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter",
    "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown",
    "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp"
];
// prettier-ignore
export const pointerEvents = [
    "onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onGotPointerCapture",
    "onLostPointerCapture", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut",
];
export const selectionEvents = ["onSelect"];
export const touchEvents = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
export const uiEvents = ["onScroll"];
export const wheelEvents = ["onWheel"];
// prettier-ignore
export const mediaEvents = [
    "onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted",
    "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay",
    "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend",
    "onTimeUpdate", "onVolumeChange", "onWaiting"
];
export const imageEvents = ["onLoad", "onError"];
export const animationEvents = ["onAnimationStart", "onAnimationEnd", "onAnimationIteration"];
export const transitionEvents = ["onTransitionEnd"];
export const otherEvents = ["onToggle"];
