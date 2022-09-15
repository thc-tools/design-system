// Libs
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

// utils
import { TransitionProps } from "react-transition-group/Transition";
import { useForkRef } from "../../core/hooks";
import { isReactElement } from "../../core/utils";
import { DURATION, EASING, createAnimation } from "./_utils";

export type SlideDirection = "left" | "right" | "up" | "down";

/**
 * Translate the node so it can't be seen on the screen
 * @param {string} direction Either "left", "right", "up" or "down"
 * @param {object} node Node to translate
 */
function getTranslateValue(direction: SlideDirection, node: HTMLDivElement | null) {
    if (!node) {
        return;
    }

    const rect = node.getBoundingClientRect();

    const computedStyle = window.getComputedStyle(node);
    const transform =
        computedStyle.getPropertyValue("-webkit-transform") ?? computedStyle.getPropertyValue("transform");

    let offsetX = 0;
    let offsetY = 0;

    if (transform && transform !== "none" && typeof transform === "string") {
        const transformValues = transform.split("(")[1].split(")")[0].split(",");
        offsetX = parseInt(transformValues[4], 10);
        offsetY = parseInt(transformValues[5], 10);
    }

    if (direction === "left") {
        return `translateX(${window.innerWidth}px) translateX(${offsetX - rect.left}px)`;
    }

    if (direction === "right") {
        return `translateX(-${rect.left + rect.width - offsetX}px)`;
    }

    if (direction === "up") {
        return `translateY(${window.innerHeight}px) translateY(${offsetY - rect.top}px)`;
    }

    // direction === SLIDE_DIRECTION.DOWN
    return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

function setTranslateValue(direction: SlideDirection, node: HTMLDivElement | null) {
    if (!node) {
        return;
    }

    const transform = getTranslateValue(direction, node);

    if (transform) {
        node.style.webkitTransform = transform;
        node.style.transform = transform;
    }
}

const defaultTimeout: SlideProps["timeout"] = {
    enter: DURATION.enteringScreen,
    exit: DURATION.leavingScreen,
};

export interface SlideProps extends React.PropsWithChildren<unknown> {
    /**
     * If element should appear with animation
     */
    appear?: boolean;
    /**
     * Direction to appear with
     */
    direction?: SlideDirection;
    /**
     * If component is showed
     */
    in: boolean;
    /**
     * Enter handler
     */
    onEnter?: (node: HTMLDivElement | null, isAppearing?: boolean) => void;
    /**
     * Entered handler
     */
    onEntered?: (node: HTMLDivElement | null, isAppearing?: boolean) => void;
    /**
     * Entering handler
     */
    onEntering?: (node: HTMLDivElement | null, isAppearing?: boolean) => void;
    /**
     * Exit handler
     */
    onExit?: (node: HTMLDivElement | null) => void;
    /**
     * Exited handler
     */
    onExited?: (node: HTMLDivElement | null) => void;
    /**
     * Exiting handler
     */
    onExiting?: (node: HTMLDivElement | null) => void;
    /**
     * Timeout for transitions
     */
    timeout?: {
        enter: number;
        exit: number;
    };
    /**
     * Additional props for Transition
     */
    transitionProps?: TransitionProps;
}

export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(function Slide(
    {
        appear = true,
        children,
        direction = "left",
        in: inProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout = defaultTimeout,
        transitionProps,
    },
    ref
) {
    const childrenRef = useRef<HTMLDivElement>(null);
    const handleRefIntermediary = useForkRef(
        children && Object.prototype.hasOwnProperty.call(children, "ref")
            ? (children as { ref: React.ForwardedRef<HTMLDivElement> }).ref
            : null,
        childrenRef
    );
    const handleRef = useForkRef(handleRefIntermediary, ref);

    const [open, setOpen] = useState(false);

    // TODO: to be removed, it should work immediately... dammit
    useEffect(() => {
        if (inProp) {
            const id = setTimeout(() => setOpen(true), 1);

            return () => clearTimeout(id);
        }

        setOpen(false);
    }, [inProp]);

    const normalizedTransitionCallback =
        (callback?: (node: HTMLDivElement | null, isAppearing?: boolean) => void) => (isAppearing?: boolean) => {
            if (!callback) {
                return;
            }

            if (isAppearing === undefined) {
                callback(childrenRef.current);
            } else {
                callback(childrenRef.current, isAppearing);
            }
        };

    const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
        setTranslateValue(direction, node);

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
        const animationProps = {
            duration: timeout.enter,
            easing: EASING.easeOut,
        };

        if (node) {
            node.style.webkitTransition = createAnimation("-webkit-transform", animationProps);
            node.style.transition = createAnimation("transform", animationProps);
            node.style.webkitTransform = "none";
            node.style.transform = "none";
        }

        if (onEntering) {
            onEntering(node, isAppearing);
        }
    });

    const handleEntered = normalizedTransitionCallback(onEntered);

    const handleExit = normalizedTransitionCallback((node) => {
        const animationProps = {
            duration: timeout.exit,
            easing: EASING.sharp,
        };

        if (node) {
            node.style.webkitTransition = createAnimation("-webkit-transform", animationProps);
            node.style.transition = createAnimation("transform", animationProps);
        }

        setTranslateValue(direction, node);

        if (onExit) {
            onExit(node);
        }
    });

    const handleExiting = normalizedTransitionCallback(onExiting);

    const handleExited = normalizedTransitionCallback((node) => {
        if (node) {
            // No need for transitions when the component is hidden
            node.style.webkitTransition = "";
            node.style.transition = "";
        }

        if (onExited) {
            onExited(node);
        }
    });

    useEffect(() => {
        // We skip configuration if the position makes it screen size invariant
        if (open || ["down", "right"].includes(direction)) {
            return;
        }

        const handleResize = debounce(() => {
            if (childrenRef.current) {
                setTranslateValue(direction, childrenRef.current);
            }
        });

        window.addEventListener("resize", handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener("resize", handleResize);
        };
    }, [open, direction]);

    useEffect(() => {
        // We need to update the position of the drawer when the direction changes and when it's hidden
        if (!open && childrenRef.current) {
            setTranslateValue(direction, childrenRef.current);
        }
    }, [open, direction]);

    const addEndListener = (_next: TimerHandler) => {
        // RAF
    };

    return (
        <Transition
            {...transitionProps}
            addEndListener={addEndListener}
            nodeRef={childrenRef}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited}
            onExiting={handleExiting}
            appear={appear}
            in={open}
            timeout={timeout}
        >
            {(state, childProps) =>
                isReactElement(children) &&
                React.cloneElement(children, {
                    ref: handleRef,
                    style: {
                        ...children.props.style,
                        visibility: state === "exited" && !open ? "hidden" : undefined,
                    },
                    ...childProps,
                })
            }
        </Transition>
    );
});
