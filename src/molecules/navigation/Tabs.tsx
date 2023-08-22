// Libs
import classnames from "classnames";
import { debounce, isNil } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Utils
import { useIsMounted } from "../../core/hooks";

// Components
import { TabProps } from "./Tab";
import { TabIndicator, TabIndicatorProps } from "./TabIndicator";

export interface TabsProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Change handler
     */
    onChange: TabProps["onChange"];
    /**
     * Additional className for TabIndicator
     */
    tabIndicatorClassName?: string;
    /**
     * Additional props for TabIndicator
     */
    tabIndicatorProps?: TabIndicatorProps;
    /**
     * Value for current Tab
     */
    currentValue?: number | string | false;
}

export function Tabs({
    children: childrenProp,
    className,
    onChange,
    tabIndicatorClassName: tabIndicatorClassNameProp,
    tabIndicatorProps = {},
    currentValue,
    ...otherProps
}: TabsProps) {
    const isMounted = useIsMounted();
    const [indicatorStyle, setIndicatorStyle] = useState<{ left?: number; width?: number }>({});

    const tabsRef = useRef<HTMLDivElement>(null);
    const tabsListRef = useRef<HTMLDivElement>(null);

    const valueToIndex: Record<number | string, number> = {};

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
        if (tabsNode && currentValue) {
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
        if (isNil(indicatorStyle.left) || isNil(indicatorStyle.width)) {
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
