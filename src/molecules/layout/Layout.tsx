// Libs
import clsx from "clsx";

// Utils
import { alterElement } from "../../core/utils";

export interface LayoutProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional className
     */
    className?: string;
    /**
     * Header to display
     */
    header: React.ReactNode;
    /**
     * Menu to display
     */
    menu?: React.ReactNode;
}

export function Layout({ children, className, header, menu }: LayoutProps): JSX.Element {
    const rootClassName = clsx("ds-c-layout", className);

    return (
        <div className={rootClassName}>
            {menu && alterElement(menu, { className: "ds-c-layout__menu" })}
            {alterElement(header, { className: "ds-c-layout__header" })}
            <div className="ds-c-layout__page">{children}</div>
        </div>
    );
}
