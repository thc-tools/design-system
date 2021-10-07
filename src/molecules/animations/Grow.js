// Libs
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

// Utils
import { useForkRef } from "../../core/hooks";
import { createAnimation, getAutoHeightDuration } from "./_utils";

function getScale(value) {
    return `scale(${value}, ${value ** 2})`;
}

const STYLES = {
    entering: {
        opacity: 1,
        transform: getScale(1),
    },
    entered: {
        opacity: 1,
        transform: "none",
    },
};

export const Grow = React.forwardRef(function Grow(
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
    const timer = useRef();
    const autoTimeout = useRef();

    const nodeRef = useRef(null);
    const foreignRef = useForkRef(children.ref, ref);
    const handleRef = useForkRef(nodeRef, foreignRef);

    const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
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

    const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
        // eslint-disable-next-line no-unused-expressions
        node.scrollTop;

        let duration;
        if (timeout === "auto") {
            duration = getAutoHeightDuration(node.clientHeight);
            autoTimeout.current = duration;
        } else {
            duration = timeout;
        }

        node.style.transition = [
            createAnimation("opacity", { duration }),
            createAnimation("transform", { duration: duration * 0.666, easing }),
        ].join(", ");

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntered = normalizedTransitionCallback(onEntered);

    const handleExiting = normalizedTransitionCallback(onExiting);

    const handleExit = normalizedTransitionCallback((node) => {
        let duration;
        if (timeout === "auto") {
            duration = getAutoHeightDuration(node.clientHeight);
            autoTimeout.current = duration;
        } else {
            duration = timeout;
        }

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

        if (onExit) {
            onExit(node);
        }
    });

    const handleExited = normalizedTransitionCallback(onExited);

    const addEndListener = (next) => {
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
            timeout={timeout === "auto" ? null : timeout}
        >
            {(state, childProps) =>
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

Grow.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
};
