// Libs
import { omit } from "lodash";
import qs from "qs";

function stripQuestionMark(queryString) {
    return queryString.startsWith("?") ? queryString.slice(1) : queryString;
}

export function setQueryStringValue(key, value, queryString = "") {
    const values = qs.parse(stripQuestionMark(queryString));

    let newValues = { ...values, [key]: value };
    if (value === undefined || value === null) {
        newValues = omit(newValues, key);
    }

    const newQsValue = qs.stringify(newValues);

    return `?${newQsValue}`;
}

export function getQueryStringValue(key, queryString) {
    const values = qs.parse(stripQuestionMark(queryString));

    return values[key];
}
