// Libs
import React, { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";

// Utils
import { TransitionProps, TransitionStatus } from "react-transition-group/Transition";
import { useForkRef } from "../../core/hooks";
import { PartialRecord, isReactElement } from "../../core/utils";
import { createAnimation, getAutoHeightDuration } from "./_utils";

function getScale(value: number): string {
    return `scale(${value}, ${value ** 2})`;
}

const STYLES: PartialRecord<TransitionStatus, React.CSSProperties> = {
    entering: {
        opacity: 1,
        transform: getScale(1),
    },
    entered: {
        opacity: 1,
        transform: "none",
    },
};

export interface GrowProps extends React.PropsWithChildren<{}> {
    /**
     * If element should appear with animation
     */
    appear?: boolean;
    /**
     * Additional className
     */
    className?: string;
    /**
     * CSS easing formula
     */
    easing?: string;
    /**
     * If is open
     */
    in: boolean;
    /**
     * Enter handler
     */
    onEnter?: (node: HTMLDivElement | null, maybeIsAppearing?: boolean) => void;
    /**
     * Entered handler
     */
    onEntered?: (node: HTMLDivElement | null, maybeIsAppearing?: boolean) => void;
    /**
     * Entering handler
     */
    onEntering?: (node: HTMLDivElement | null, maybeIsAppearing?: boolean) => void;
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
     * Timeout, can be "auto"
     */
    timeout?: number | "auto";
    /**
     * Additional transition props
     */
    transitionProps?: TransitionProps;
}

export const Grow = React.forwardRef<HTMLDivElement, GrowProps>(function Grow(
    {
        appear = true,
        children,
        easing,
        in: inProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout = "auto",
        transitionProps,
    },
    ref
) {
    const timer = useRef<number>();
    const autoTimeout = useRef<number>();

    const nodeRef = useRef(null);
    const foreignRef = useForkRef(
        children && Object.prototype.hasOwnProperty.call(children, "ref")
            ? (children as { ref: React.ForwardedRef<HTMLDivElement> }).ref
            : null,
        ref
    );
    const handleRef = useForkRef(nodeRef, foreignRef);

    const normalizedTransitionCallback =
        (callback?: (node: HTMLDivElement | null, maybeIsAppearing?: boolean) => void) =>
        (maybeIsAppearing?: boolean) => {
            if (!callback) {
                return;
            }

            const node = nodeRef.current;

            // onEnterXxx and onExitXxx callbacks have a different arguments.length value
            if (maybeIsAppearing === undefined) {
                callback(node);
            } else {
                callback(node, maybeIsAppearing);
            }
        };

    const handleEntering = normalizedTransitionCallback(onEntering);

    const handleEnter = normalizedTransitionCallback((node, maybeIsAppearing) => {
        if (node) {
            node.scrollTop;
        }

        let duration = 0;
        if (timeout === "auto") {
            if (node) {
                duration = getAutoHeightDuration(node.clientHeight);
            }
            autoTimeout.current = duration;
        } else {
            duration = timeout;
        }

        if (node) {
            node.style.transition = [
                createAnimation("opacity", { duration }),
                createAnimation("transform", { duration: duration * 0.666, easing }),
            ].join(", ");
        }

        if (onEnter) {
            onEnter(node, maybeIsAppearing);
        }
    });

    const handleEntered = normalizedTransitionCallback(onEntered);

    const handleExiting = normalizedTransitionCallback(onExiting);

    const handleExit = normalizedTransitionCallback((node) => {
        let duration = 0;
        if (timeout === "auto") {
            if (node) {
                duration = getAutoHeightDuration(node.clientHeight);
            }
            autoTimeout.current = duration;
        } else {
            duration = timeout;
        }

        if (node) {
            node.style.transition = [
                createAnimation("opacity", { duration }),
                createAnimation("transform", {
                    duration: duration * 0.666,
                    delay: duration * 0.333,
                    easing,
                }),
            ].join(", ");

            node.style.opacity = "0";
            node.style.transform = getScale(0.75);
        }

        if (onExit) {
            onExit(node);
        }
    });

    const handleExited = normalizedTransitionCallback(onExited);

    const addEndListener = (next: TimerHandler) => {
        if (timeout === "auto") {
            timer.current = setTimeout(next, autoTimeout.current || 0);
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    return (
        <Transition
            {...transitionProps}
            appear={appear}
            in={inProp}
            nodeRef={nodeRef}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited}
            onExiting={handleExiting}
            addEndListener={addEndListener}
            timeout={timeout === "auto" ? undefined : timeout}
        >
            {(state, childProps) =>
                isReactElement(children) &&
                React.cloneElement(children, {
                    style: {
                        opacity: 0,
                        transform: getScale(0.75),
                        visibility: state === "exited" && !inProp ? "hidden" : undefined,
                        ...STYLES[state],
                        ...children.props.style,
                    },
                    ref: handleRef,
                    ...childProps,
                })
            }
        </Transition>
    );
});
