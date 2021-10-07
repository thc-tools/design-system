// Libs
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { Transition } from "react-transition-group";

// utils
import { useForkRef } from "../../core/hooks";
import { DURATION, EASING, createAnimation } from "./_utils";

export const SLIDE_DIRECTION = {
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down",
};

/**
 * Translate the node so it can't be seen on the screen
 * @param {string} direction Either "left", "right", "up" or "down"
 * @param {object} node Node to translate
 */
function getTranslateValue(direction, node) {
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

    if (direction === SLIDE_DIRECTION.LEFT) {
        return `translateX(${window.innerWidth}px) translateX(${offsetX - rect.left}px)`;
    }

    if (direction === SLIDE_DIRECTION.RIGHT) {
        return `translateX(-${rect.left + rect.width - offsetX}px)`;
    }

    if (direction === SLIDE_DIRECTION.UP) {
        return `translateY(${window.innerHeight}px) translateY(${offsetY - rect.top}px)`;
    }

    // direction === SLIDE_DIRECTION.DOWN
    return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

function setTranslateValue(direction, node) {
    if (!node) {
        return;
    }

    const transform = getTranslateValue(direction, node);

    if (transform) {
        node.style.webkitTransform = transform;
        node.style.transform = transform;
    }
}

const defaultTimeout = {
    enter: DURATION.enteringScreen,
    exit: DURATION.leavingScreen,
};

export const Slide = React.forwardRef(function Slide(
    {
        appear = true,
        children,
        direction = SLIDE_DIRECTION.LEFT,
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
    const childrenRef = useRef(null);
    const handleRefIntermediary = useForkRef(children.ref, childrenRef);
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

    const normalizedTransitionCallback = (callback) => (isAppearing) => {
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

        node.style.webkitTransition = createAnimation("-webkit-transform", animationProps);
        node.style.transition = createAnimation("transform", animationProps);
        node.style.webkitTransform = "none";
        node.style.transform = "none";

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

        node.style.webkitTransition = createAnimation("-webkit-transform", animationProps);
        node.style.transition = createAnimation("transform", animationProps);

        setTranslateValue(direction, node);

        if (onExit) {
            onExit(node);
        }
    });

    const handleExiting = normalizedTransitionCallback(onExiting);

    const handleExited = normalizedTransitionCallback((node) => {
        // No need for transitions when the component is hidden
        node.style.webkitTransition = "";
        node.style.transition = "";

        if (onExited) {
            onExited(node);
        }
    });

    useEffect(() => {
        // We skip configuration if the position makes it screen size invariant
        if (open || [SLIDE_DIRECTION.DOWN, SLIDE_DIRECTION.RIGHT].includes(direction)) {
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

    return (
        <Transition
            {...transitionProps}
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

Slide.propTypes = {
    /**
     * If element should appear with animation
     */
    appear: PropTypes.bool,
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Direction to appear with
     */
    direction: PropTypes.oneOf(Object.values(SLIDE_DIRECTION)),
    /**
     * If component is showed
     */
    in: PropTypes.bool,
    /**
     * Enter handler
     */
    onEnter: PropTypes.func,
    /**
     * Entered handler
     */
    onEntered: PropTypes.func,
    /**
     * Entering handler
     */
    onEntering: PropTypes.func,
    /**
     * Exit handler
     */
    onExit: PropTypes.func,
    /**
     * Exited handler
     */
    onExited: PropTypes.func,
    /**
     * Exiting handler
     */
    onExiting: PropTypes.func,
    /**
     * Timeout for transitions
     */
    timeout: PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number,
    }),
    /**
     * Additional props for Transition
     */
    transitionProps: PropTypes.shape(Transition.propTypes),
};
