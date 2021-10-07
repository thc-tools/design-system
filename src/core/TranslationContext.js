// Libs
import React, { useContext, useMemo } from "react";

const TranslationContext = React.createContext({});

export const THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY = "thc.design-system.common";

function translateFnBuilder(translationFn, prefix, namespace) {
    return function translate(key, options) {
        const translationKey = [prefix, namespace, key].filter(Boolean).join(".");
        return translationFn(translationKey, options);
    };
}

export function useTranslation(prefix) {
    const { prefix: prefixCtx, translationFn, globals } = useContext(TranslationContext);

    const translates = useMemo(() => {
        return Object.entries(globals ?? {}).reduce(
            (acc, [namespaceKey, namespace]) => ({
                ...acc,
                [`translate${namespaceKey}`]: translateFnBuilder(translationFn, undefined, namespace),
            }),
            {
                translate: translateFnBuilder(translationFn, prefixCtx, prefix),
            }
        );
    }, [prefix, prefixCtx, globals, translationFn]);

    return translates;
}

export function TranslationProvider({
    children,
    prefix: prefixProp,
    translationFn: translationFnProp,
    globals: globalsProp,
}) {
    const { prefix: prefixContext, translationFn: translationFnContext, globals: globalsContext } = useContext(
        TranslationContext
    );

    const value = useMemo(
        () => ({
            prefix: [prefixContext, prefixProp].filter(Boolean).join("."),
            translationFn: translationFnProp ?? translationFnContext,
            globals: { ...globalsContext, ...globalsProp },
        }),
        [prefixContext, prefixProp, translationFnProp, translationFnContext, globalsProp, globalsContext]
    );

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}
