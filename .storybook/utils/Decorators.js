// Libs
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

import { ThemeContainer, SepiaThemeContainer } from "./ThemeContainer";

import { TranslationProvider, THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY } from "../../src/core/TranslationContext";
import { designSystemTranslations } from "../../src/translations";
import { ToastProvider } from "../../src/molecules/modals/ToastProvider";

function decoratorBuilder(ThemeContainerComponent) {
    return function ThemeDecorator(Story, { globals: { theme } }) {
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

export function RouterDecorator(Story) {
    return (
        <MemoryRouter initialEntries={["/datasets"]}>
            <PathDisplay />
            <Story />
        </MemoryRouter>
    );
}

export function ToasterDecorator(Story) {
    return (
        <ToastProvider>
            <Story />
        </ToastProvider>
    );
}

function simpleTranslate(key, options) {
    let translation = designSystemTranslations[key] ?? key;
    if (options && Object.keys(options).length) {
        Object.entries(options).forEach(([key, value]) => {
            translation = translation.replace(`{${key}}`, value);
        });
    }

    return translation;
}

export function TranslationDecorator(Story) {
    return (
        <TranslationProvider
            translationFn={simpleTranslate}
            globals={{
                DesignSystem: THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY,
            }}
        >
            <Story />
        </TranslationProvider>
    );
}
