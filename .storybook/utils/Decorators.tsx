// Libs
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

import { SepiaThemeContainer, ThemeContainer } from "./ThemeContainer";

import { Theme, TranslationProvider } from "../../src/core";
import { enGB_DesignSystemTranslations } from "../../src/translations";

function decoratorBuilder(ThemeContainerComponent: React.FunctionComponent<any>) {
    return function ThemeDecorator(
        Story: React.FunctionComponent,
        { globals: { theme } }: { globals: { theme: Theme } }
    ) {
        return (
            <ThemeContainerComponent theme={theme}>
                <Story />
            </ThemeContainerComponent>
        );
    };
}

export const ThemeDecorator = decoratorBuilder(ThemeContainer);

export const SepiaThemeDecorator = decoratorBuilder(SepiaThemeContainer);

function PathDisplay() {
    const location = useLocation();

    return <div style={{ padding: "10px" }}>{`Currently on: ${location.pathname}${location.search}`}</div>;
}

export function RouterDecorator(Story: React.FunctionComponent) {
    return (
        <MemoryRouter initialEntries={["/datasets"]}>
            <PathDisplay />
            <Story />
        </MemoryRouter>
    );
}

function simpleTranslate(key: string, options: Record<string, string>) {
    let translation = enGB_DesignSystemTranslations[key] ?? key;
    if (options && Object.keys(options).length) {
        Object.entries(options).forEach(([key, value]) => {
            translation = translation.replace(`{${key}}`, value);
        });
    }

    return translation;
}

export function TranslationDecorator(Story: React.FunctionComponent) {
    return (
        <TranslationProvider translationFn={simpleTranslate} globals={{}}>
            <Story />
        </TranslationProvider>
    );
}
