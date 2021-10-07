// Libs
import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { debounce } from "lodash";

// Utils
import { useIsMounted } from "../../core/hooks";

// Components
import { TabIndicator } from "./TabIndicator";

export function Tabs({
    children: childrenProp,
    className,
    onChange,
    tabIndicatorClassName: tabIndicatorClassNameProp,
    tabIndicatorProps = {},
    currentValue,
    ...otherProps
}) {
    const isMounted = useIsMounted();
    const [indicatorStyle, setIndicatorStyle] = useState({});

    const tabsRef = useRef();
    const tabsListRef = useRef();

    const valueToIndex = {};

    const rootClassName = classnames("thc-o-paper thc-c-tabs", className);
    const tabIndicatorClassName = classnames("thc-c-tabs__indicator", tabIndicatorClassNameProp);

    const getTabsMeta = useCallback(() => {
        const tabsNode = tabsRef.current;

        let tabsMeta;
        if (tabsNode) {
            const rect = tabsNode.getBoundingClientRect();

            tabsMeta = {
                clientWidth: tabsNode.clientWidth,
                top: rect.top,
                bottom: rect.bottom,
                left: rect.left,
                right: rect.right,
            };
        }

        let tabMeta;
        if (tabsNode && currentValue !== false) {
            const { children } = tabsListRef.current;

            if (children && children.length > 0) {
                const tab = children[valueToIndex[currentValue]];

                tabMeta = tab?.getBoundingClientRect();
            }
        }

        return { tabsMeta, tabMeta };
    }, [currentValue, valueToIndex]);

    const updateIndicatorState = useCallback(() => {
        const { tabsMeta, tabMeta } = getTabsMeta();

        let startValue = 0;
        if (tabMeta && tabsMeta) {
            startValue = tabMeta.left - tabsMeta.left;
        }

        const newIndicatorStyle = {
            left: startValue,
            width: tabMeta ? tabMeta.width : 0,
        };

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(indicatorStyle.left) || isNaN(indicatorStyle.width)) {
            setIndicatorStyle(newIndicatorStyle);
        } else {
            const dLeft = Math.abs(indicatorStyle.left - newIndicatorStyle.left);
            const dWidth = Math.abs(indicatorStyle.width - newIndicatorStyle.width);

            if (dLeft >= 1 || dWidth >= 1) {
                setIndicatorStyle(newIndicatorStyle);
            }
        }
    }, [getTabsMeta, indicatorStyle]);

    useEffect(() => {
        const handleResize = debounce(() => {
            updateIndicatorState();
        });

        window.addEventListener("resize", handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener("resize", handleResize);
        };
    }, [updateIndicatorState]);

    useEffect(() => updateIndicatorState(), [updateIndicatorState]);
    useEffect(() => {
        const resize = debounce(() => {
            updateIndicatorState();
        });

        const id = setTimeout(resize, 5);

        return () => {
            clearTimeout(id);
            resize.cancel();
        };
    }, [updateIndicatorState]);

    const indicator = (
        <TabIndicator
            {...tabIndicatorProps}
            className={tabIndicatorClassName}
            style={{
                ...tabIndicatorProps.style,
                ...indicatorStyle,
            }}
        />
    );

    const children = React.Children.map(childrenProp, (child, childIndex) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const childValue = child.props.value ?? childIndex;

        valueToIndex[childValue] = childIndex;

        const selected = childValue === currentValue;

        return React.cloneElement(child, {
            indicator: selected && !isMounted.current ? indicator : undefined,
            key: childValue,
            onChange,
            selected,
            value: childValue,
        });
    });

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="thc-c-tabs__container" ref={tabsRef}>
                <div className="thc-c-tabs__list-container" ref={tabsListRef}>
                    {children}
                </div>
                {isMounted.current && indicator}
            </div>
        </div>
    );
}

Tabs.propTypes = {
    /**
     * Children tabs
     */
    children: PropTypes.node,
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Change handler
     */
    onChange: PropTypes.func,
    /**
     * Additional className for TabIndicator
     */
    tabIndicatorClassName: PropTypes.string,
    /**
     * Additional props for TabIndicator
     */
    tabIndicatorProps: PropTypes.shape(TabIndicator.propTypes),
    /**
     * Value for current Tab
     */
    currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
