// Libs
import clsx from "clsx";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Utils
import { useIsMounted } from "../../core/hooks";

// Components
import { TabProps } from "./Tab";
import { TabIndicator, TabIndicatorProps } from "./TabIndicator";

export interface TabsProps extends React.PropsWithChildren<unknown> {
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
}: TabsProps): JSX.Element {
    const isMounted = useIsMounted();
    const [indicatorStyle, setIndicatorStyle] = useState<{ left?: number; width?: number }>({});

    const tabsRef = useRef<HTMLDivElement>(null);
    const tabsListRef = useRef<HTMLDivElement>(null);

    const valueToIndex: Record<number | string, number> = {};

    const rootClassName = clsx("ds-o-paper ds-c-tabs", className);
    const tabIndicatorClassName = clsx("ds-c-tabs__indicator", tabIndicatorClassNameProp);

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

        return React.cloneElement<any>(child, {
            indicator: selected && !isMounted ? indicator : undefined,
            key: childValue,
            onChange,
            selected,
            value: childValue,
        });
    });

    return (
        <div {...otherProps} className={rootClassName}>
            <div className="ds-c-tabs__container" ref={tabsRef}>
                <div className="ds-c-tabs__list-container" ref={tabsListRef}>
                    {children}
                </div>
                {isMounted && indicator}
            </div>
        </div>
    );
}
