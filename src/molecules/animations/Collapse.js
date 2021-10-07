// Libs
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Transition } from "react-transition-group";

// Utils
import { useForkRef } from "../../core/hooks";
import { DURATION, getAutoHeightDuration } from "./_utils";

export const Collapse = React.forwardRef(function Collapse(
    {
        children,
        className,
        collapsedSize: collapsedSizeProp = "0px",
        in: inProp = false,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        style: styleProp,
        timeout = DURATION.standard,
        ...otherProps
    },
    ref
) {
    const rootClassName = classnames("thc-c-collapse", className);

    const collapsedSize = typeof collapsedSizeProp === "number" ? `${collapsedSizeProp}px` : collapsedSizeProp;

    const timer = useRef();
    const autoTransitionDuration = useRef();

    const wrapperRef = useRef(null);
    const nodeRef = useRef(null);
    const handleRef = useForkRef(ref, nodeRef);

    useEffect(() => () => clearTimeout(timer.current), []);

    const normalizedTransitionCallback = (callback) => (isAppearing) => {
        if (!callback) {
            return;
        }

        if (isAppearing === undefined) {
            callback(nodeRef.current);
        } else {
            callback(nodeRef.current, isAppearing);
        }
    };

    const getWrapperSize = () => (wrapperRef.current ? wrapperRef.current.clientHeight : 0);

    const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
        node.style.height = collapsedSize;

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
        const wrapperSize = getWrapperSize();

        if (timeout === "auto") {
            const duration = getAutoHeightDuration(wrapperSize);
            node.style.transitionDuration = `${duration}ms`;
            autoTransitionDuration.current = duration;
        } else {
            node.style.transitionDuration = typeof timeout === "number" ? `${timeout}ms` : timeout;
        }

        node.style.height = `${wrapperSize}px`;

        if (onEntering) {
            onEntering(node, isAppearing);
        }
    });

    const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
        node.style.height = "auto";

        if (onEntered) {
            onEntered(node, isAppearing);
        }
    });

    const handleExit = normalizedTransitionCallback((node) => {
        node.style.height = `${getWrapperSize()}px`;

        if (onExit) {
            onExit(node);
        }
    });

    const handleExited = normalizedTransitionCallback(onExited);

    const handleExiting = normalizedTransitionCallback((node) => {
        const wrapperSize = getWrapperSize();

        if (timeout === "auto") {
            const duration = getAutoHeightDuration(wrapperSize);
            node.style.transitionDuration = `${duration}ms`;
            autoTransitionDuration.current = duration;
        } else {
            node.style.transitionDuration = typeof timeout === "number" ? `${timeout}ms` : timeout;
        }

        node.style.height = collapsedSize;

        if (onExiting) {
            onExiting(node);
        }
    });

    const addEndListener = (next) => {
        if (timeout === "auto") {
            timer.current = setTimeout(next, autoTransitionDuration.current || 0);
        }
    };

    return (
        <Transition
            in={inProp}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited}
            onExiting={handleExiting}
            addEndListener={addEndListener}
            nodeRef={nodeRef}
            timeout={timeout === "auto" ? null : timeout}
        >
            {(state, childProps) => (
                <div
                    {...otherProps}
                    {...childProps}
                    className={classnames(
                        rootClassName,
                        {
                            "thc-c-collapse--entered": state === "entered",
                            "thc-c-collapse--hidden": state === "exited" && !inProp && collapsedSize === "0px",
                        },
                        childProps.className
                    )}
                    style={{
                        ...childProps.style,
                        ...styleProp,
                        minHeight: collapsedSize,
                    }}
                    ref={handleRef}
                >
                    <div className="thc-c-collapse__wrapper" ref={wrapperRef}>
                        <div className="thc-c-collapse__wrapper-inner">{children}</div>
                    </div>
                </div>
            )}
        </Transition>
    );
});

Collapse.propTypes = {
    /**
     * Children to animate
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Collapsed size
     */
    collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * If is open
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
     * Additional style
     */
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    /**
     * Timeout, can be "auto"
     */
    timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
