// Libs
import React, { useContext, useMemo } from "react";
import { capitalizeFirst } from "./utils/strings";

export type TFunction = (key: string, args?: any) => string;

export interface TranslationContextValue {
    translationFn: TFunction;
    globals?: {
        [prefixKey: string]: string;
    };
}

const TranslationContext = React.createContext<TranslationContextValue>({ translationFn: (key) => key });

export function translateFnBuilder(translationFn: TFunction, prefix: string | undefined = ""): TFunction {
    return function t(key, options) {
        const joinValue = prefix.endsWith(":") ? "" : ".";
        const translationKey = [prefix, key].filter(Boolean).join(joinValue);
        return translationFn(translationKey, options);
    };
}

export function useTranslation(options?: string | Record<string, string>): Record<string, TFunction> {
    const { translationFn, globals } = useContext(TranslationContext);

    const translates = useMemo(() => {
        const base: Record<string, TFunction> = Object.entries(globals ?? {}).reduce(
            (acc, [prefixKey, prefix]) => ({
                ...acc,
                [`translate${capitalizeFirst(prefixKey)}`]: translateFnBuilder(translationFn, prefix),
            }),
            {}
        );

        if (typeof options === "string" || typeof options === "undefined") {
            return {
                ...base,
                t: translateFnBuilder(translationFn, options),
            };
        }

        return Object.entries(options).reduce(
            (acc, [prefixKey, prefix]) => ({
                ...acc,
                [`t${capitalizeFirst(prefixKey)}`]: translateFnBuilder(translationFn, prefix),
            }),
            base
        );
    }, [options, globals, translationFn]);

    return translates;
}

export function TranslationProvider({
    children,
    translationFn: translationFnProp,
    globals: globalsProp,
}: React.PropsWithChildren<TranslationContextValue>): JSX.Element {
    const { translationFn: translationFnContext, globals: globalsContext } = useContext(TranslationContext);

    const value = useMemo(
        () => ({
            translationFn: translationFnProp ?? translationFnContext,
            globals: { ...globalsContext, ...globalsProp },
        }),
        [translationFnProp, translationFnContext, globalsProp, globalsContext]
    );

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}
