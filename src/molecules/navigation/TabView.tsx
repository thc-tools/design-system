import clsx from "clsx";

export interface TabViewProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * If has flex layout
     */
    withFlex?: boolean;
}

export function TabView({ children, className, withFlex = false }: TabViewProps): JSX.Element {
    const tabViewClass = clsx("ds-c-tab-view", { "ds-c-tab-view--flex": withFlex }, className);
    return <div className={tabViewClass}>{children}</div>;
}
