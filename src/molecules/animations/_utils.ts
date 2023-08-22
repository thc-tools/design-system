// Follow https://material.io/design/motion/speed.html#easing
// to learn when use what timing
export const DURATION = {
    // most basic recommended timing
    standard: 300,
    // this is to be used in complex animations
    complex: 375,
    // recommended when something is entering screen
    enteringScreen: 225,
    // recommended when something is leaving screen
    leavingScreen: 195,
};

// Follow https://material.io/design/motion/speed.html#easing
// to learn the context in which each easing should be used.
export const EASING = {
    // This is the most common easing curve.
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    // Objects enter the screen at full velocity from off-screen and
    // slowly decelerate to a resting point.
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    // Objects leave the screen at full velocity. They do not decelerate when off-screen.
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    // The sharp curve is used by objects that may return to the screen at any time.
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
};

function formatMs(ms: number): string {
    return `${Math.round(ms)}ms`;
}

function msify(ms: number | string) {
    return typeof ms === "string" ? ms : formatMs(ms);
}

export function createAnimation(
    animatedProperties: string | string[] = ["all"],
    { duration = DURATION.standard, easing = EASING.easeInOut, delay = 0 } = {}
): string {
    return (Array.isArray(animatedProperties) ? animatedProperties : [animatedProperties])
        .map((animatedProperty) => `${animatedProperty} ${msify(duration)} ${easing} ${msify(delay)}`)
        .join(", ");
}

export function getAutoHeightDuration(height?: number): number {
    if (!height) {
        return 0;
    }

    const constant = height / 36;

    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    // Thanks to material for that formula !
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
