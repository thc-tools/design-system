// Libs
import clsx from "clsx";
import React, { useContext } from "react";
import { DivProps } from "./utils";

export type Theme = "light" | "dark" | "color";

export interface ThemeContextValue {
    theme: Theme;
}

const ThemeContext = React.createContext<ThemeContextValue>({ theme: "light" });

const THEME_REVERSE: Record<Theme, Theme> = {
    light: "dark",
    dark: "light",
    color: "color",
};

export function useTheme(): ThemeContextValue {
    return useContext(ThemeContext);
}

export interface ThemeProviderProps extends React.PropsWithChildren<RDivProps> {
    /**
     * Additional className for Theme
     */
    className?: string;
    /**
     * If has no div
     */
    noDiv?: boolean;
    /**
     * Theme value
     */
    theme?: Theme | "reverse";
}

export function ThemeProvider({
    children,
    className,
    noDiv = false,
    theme: themeProp,
    ...otherProps
}: ThemeProviderProps): JSX.Element {
    const { theme: themeContext } = useTheme();

    let theme: Theme;

    if (themeProp === "reverse") {
        theme = THEME_REVERSE[themeContext];
    } else {
        theme = themeProp ?? themeContext;
    }

    const rootClassName = clsx(
        {
            "ds-theme--light": theme === "light",
            "ds-theme--dark": theme === "dark",
            "ds-theme--color": theme === "color",
        },
        className
    );

    let content = children;

    if (!noDiv) {
        content = (
            <div {...otherProps} className={rootClassName}>
                {content}
            </div>
        );
    } else if (React.isValidElement(children)) {
        content = React.cloneElement<{ className?: string }>(children, {
            className: clsx(rootClassName, children.props.className),
        });
    }

    return <ThemeContext.Provider value={{ theme }}>{content}</ThemeContext.Provider>;
}
