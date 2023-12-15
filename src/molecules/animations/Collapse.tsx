// Libs
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";

// Utils
import { useForkRef } from "../../core/hooks";
import { DURATION, getAutoHeightDuration } from "./_utils";

export interface CollapseProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Collapsed size
     */
    collapsedSize?: number | string;
    /**
     * If is open
     */
    in?: boolean;
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
     * Additional style
     */
    style?: React.CSSProperties;
    /**
     * Timeout, can be "auto"
     */
    timeout?: number | "auto";
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
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
    const rootClassName = clsx("ds-c-collapse", className);

    const collapsedSize = typeof collapsedSizeProp === "number" ? `${collapsedSizeProp}px` : collapsedSizeProp;

    const timer = useRef<number>();
    const autoTransitionDuration = useRef<number>();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(ref, nodeRef);

    useEffect(() => () => clearTimeout(timer.current), []);

    const normalizedTransitionCallback =
        (callback?: (node: HTMLDivElement | null, isAppearing?: boolean) => void) => (isAppearing?: boolean) => {
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
        if (node) {
            node.style.height = collapsedSize;
        }

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
        const wrapperSize = getWrapperSize();

        if (timeout === "auto") {
            const duration = getAutoHeightDuration(wrapperSize);
            if (node) {
                node.style.transitionDuration = `${duration}ms`;
            }
            autoTransitionDuration.current = duration;
        } else if (node) {
            node.style.transitionDuration = typeof timeout === "number" ? `${timeout}ms` : timeout;
        }

        if (node) {
            node.style.height = `${wrapperSize}px`;
        }

        if (onEntering) {
            onEntering(node, isAppearing);
        }
    });

    const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
        if (node) {
            node.style.height = "auto";
        }

        if (onEntered) {
            onEntered(node, isAppearing);
        }
    });

    const handleExit = normalizedTransitionCallback((node) => {
        if (node) {
            node.style.height = `${getWrapperSize()}px`;
        }

        if (onExit) {
            onExit(node);
        }
    });

    const handleExited = normalizedTransitionCallback(onExited);

    const handleExiting = normalizedTransitionCallback((node) => {
        const wrapperSize = getWrapperSize();

        if (timeout === "auto") {
            const duration = getAutoHeightDuration(wrapperSize);
            if (node) {
                node.style.transitionDuration = `${duration}ms`;
            }
            autoTransitionDuration.current = duration;
        } else if (node) {
            node.style.transitionDuration = typeof timeout === "number" ? `${timeout}ms` : timeout;
        }

        if (node) {
            node.style.height = collapsedSize;
        }

        if (onExiting) {
            onExiting(node);
        }
    });

    const addEndListener = (next: TimerHandler) => {
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
            timeout={timeout === "auto" ? undefined : timeout}
        >
            {(state, childProps) => (
                <div
                    {...otherProps}
                    {...childProps}
                    className={clsx(
                        rootClassName,
                        {
                            "ds-c-collapse--entered": state === "entered",
                            "ds-c-collapse--hidden": state === "exited" && !inProp && collapsedSize === "0px",
                        },
                        childProps?.className as string
                    )}
                    style={{
                        ...(childProps?.style as React.CSSProperties),
                        ...styleProp,
                        minHeight: collapsedSize,
                    }}
                    ref={handleRef}
                >
                    <div className="ds-c-collapse__wrapper" ref={wrapperRef}>
                        <div className="ds-c-collapse__wrapper-inner">{children}</div>
                    </div>
                </div>
            )}
        </Transition>
    );
});
