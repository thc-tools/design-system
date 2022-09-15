// Libs
import { omit } from "lodash";
import qs from "qs";

function stripQuestionMark(queryString: string): string {
    return queryString.startsWith("?") ? queryString.slice(1) : queryString;
}

export function setQueryStringValue(
    key: string,
    value: string,
    queryString = "",
    options: { parseOptions?: any; stringifyOptions?: any } = {}
): string {
    const values = qs.parse(stripQuestionMark(queryString), options.parseOptions);

    let newValues = { ...values, [key]: value };
    if (value === undefined || value === null) {
        newValues = omit(newValues, key);
    }

    const newQsValue = qs.stringify(newValues, options.stringifyOptions);

    return `?${newQsValue}`;
}

export function getQueryStringValue(
    key: string,
    queryString: string,
    options: { parseOptions?: any } = {}
): string | undefined {
    const values = qs.parse(stripQuestionMark(queryString), options.parseOptions);

    return values[key] as string;
}
