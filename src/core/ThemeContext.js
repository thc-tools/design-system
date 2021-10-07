// Libs
import React, { useContext } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const ThemeContext = React.createContext({});

export const THEME = {
    LIGHT: "light",
    DARK: "dark",
    COLOR: "color",
    REVERSE: "reverse",
};

const THEME_REVERSE = {
    [THEME.LIGHT]: THEME.DARK,
    [THEME.DARK]: THEME.LIGHT,
    [THEME.COLOR]: THEME.COLOR,
};

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children, className, theme: themeProp, ...otherProps }) {
    const { theme: themeContext } = useTheme();

    let theme;

    if (themeProp === THEME.REVERSE) {
        theme = THEME_REVERSE[themeContext ?? THEME.LIGHT];
    } else {
        theme = themeProp ?? themeContext ?? THEME.LIGHT;
    }

    const rootClassName = classnames(
        {
            "thc-theme--light": theme === THEME.LIGHT,
            "thc-theme--dark": theme === THEME.DARK,
            "thc-theme--color": theme === THEME.COLOR,
        },
        className
    );

    return (
        <ThemeContext.Provider value={{ theme }}>
            <div {...otherProps} className={rootClassName}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for Theme
     */
    className: PropTypes.string,
    /**
     * Theme value
     */
    theme: PropTypes.oneOf(Object.values(THEME)),
};
