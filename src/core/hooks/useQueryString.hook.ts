// Libs
import { parse, stringify } from "qs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { filterEntriesKeys, getQueryStringValue, objectify, removeUndefinedKeys, setQueryStringValue } from "../utils";

export type QsKey = string | string[];
export type QsKeyValue<T extends QsKey> = T extends string ? string : Record<string, string>;

/**
 * The hook has two signatures:
 * - useQueryString(keyProp: string, initialValueProp: any | undefined)
 * - useQueryString(keyProp: string[], initialValueProp: { [key: string]: any } | undefined)
 *
 * It will return like useState an array with: [value, setValue]
 * The setValue function accepts the same type as initialValueProp
 *
 */
export function useQueryString<P extends QsKey, T = QsKeyValue<P>>(
    qsKey: P,
    initialValueProp: T | undefined = undefined,
    { parseOptions, stringifyOptions }: { parseOptions?: any; stringifyOptions?: any } = {}
): [T, (t: T) => void] {
    const location = useLocation();
    const history = useHistory();

    const simpleMode = typeof qsKey === "string";

    const keys = useMemo(() => (simpleMode ? [qsKey] : qsKey), [simpleMode, qsKey]) as string[];

    // Remove non considered params from query string before computing currentQsValues
    // Because useMemo compare strings by values -> to not trigger if other qs param change
    const qsParsed = parse(location.search.slice(1), parseOptions);
    const filteredQsParsed = objectify(filterEntriesKeys(Object.entries(qsParsed), keys));
    const filteredQsString = stringify(filteredQsParsed, stringifyOptions);

    const currentQsValues = useMemo(() => {
        return keys.reduce((acc, key) => {
            const qsValue = getQueryStringValue(key, filteredQsString, { parseOptions });

            return { ...acc, [key]: qsValue };
        }, {});
    }, [keys, filteredQsString]);

    const initialValues = {
        ...(simpleMode && initialValueProp ? { [qsKey]: initialValueProp } : initialValueProp),
        ...removeUndefinedKeys(currentQsValues),
    };

    const [values, setValues] = useState(initialValues);

    const onSetValue = useCallback(
        (newValueProp) => {
            const newValues = simpleMode ? { [qsKey]: newValueProp } : newValueProp;

            const newQsValue = Object.entries(newValues).reduce(
                (qsString, [key, val]) =>
                    setQueryStringValue(key, val as string, qsString, { parseOptions, stringifyOptions }),
                location.search
            );

            setValues((state) => ({ ...state, ...newValues }));
            history.replace(`${location.pathname}${newQsValue}`);
        },
        [location.search, location.pathname, history, qsKey, simpleMode]
    );

    // Before overriding with undefined from QS, we want to have it at least once be used
    // Otherwise it breaks the initialValue possibility
    const currentQsValuesRef = useRef(currentQsValues);
    useEffect(() => {
        const currentQsValuesSorted = objectify(
            Object.entries(currentQsValues).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        );
        const valuesSorted = objectify(Object.entries(values).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)));

        const currentQsValuesString = stringify(currentQsValuesSorted, stringifyOptions);
        const valueString = stringify(valuesSorted, stringifyOptions);

        if (
            (Object.keys(removeUndefinedKeys(currentQsValuesRef.current)).length > 0 ||
                Object.keys(removeUndefinedKeys(currentQsValues)).length > 0) &&
            currentQsValuesString !== valueString
        ) {
            setValues((state) => ({ ...state, ...currentQsValues }));
        }

        currentQsValuesRef.current = currentQsValues;
    }, [currentQsValues, values]);

    return [(simpleMode ? values[qsKey] : values) as T, onSetValue];
}
