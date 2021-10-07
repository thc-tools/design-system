// Libs
import React from "react";

// Components
import { ThemeProvider } from "../../src/core/ThemeContext";

function themeContainerBuilder(lightColor, darkColor, negMargin) {
    return function ThemeContainer({ theme = "light", children }) {
        return (
            <ThemeProvider
                theme={theme}
                style={{
                    backgroundColor: theme === "light" ? lightColor : darkColor,
                    padding: "30px",
                    borderRadius: "10px",
                    margin: negMargin ? "-30px" : undefined,
                }}
            >
                {children}
            </ThemeProvider>
        );
    };
}

export const ThemeContainer = themeContainerBuilder("transparent", "#333", false);

export const SepiaThemeContainer = themeContainerBuilder("#f5f5f5", "transparent", true);
