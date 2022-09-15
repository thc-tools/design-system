// Libs
import clsx from "clsx";
import { alterElement } from "src/design-system/core/utils";
import { Tabs, TabsProps } from "src/design-system/molecules/navigation/Tabs";

// Components

export type PillTabsProps = TabsProps;

export function PillTabs({ children, className: classNameProp, ...props }: PillTabsProps): JSX.Element {
    const className = clsx("ds-c-pill-tabs", classNameProp);
    return (
        <Tabs className={className} {...props}>
            {alterElement(children, { labelClassName: "ds-u-typography--body" })}
        </Tabs>
    );
}
