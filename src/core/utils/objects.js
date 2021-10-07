export function filterEntriesKeys(entries, keys) {
    return entries.filter(([key]) => keys.includes(key));
}

export function objectify(entries) {
    return entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

export function removeUndefinedKeys(obj) {
    return objectify(Object.entries(obj).filter(([, value]) => typeof value !== "undefined"));
}
