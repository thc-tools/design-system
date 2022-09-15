export function filterEntriesKeys(entries: [string, unknown][], keys: string[]): [string, unknown][] {
    return entries.filter(([key]) => keys.includes(key));
}

export function objectify(entries: [string, unknown][]): Record<string, unknown> {
    return entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

export function removeUndefinedKeys(obj: Record<string, unknown>): Record<string, unknown> {
    return objectify(Object.entries(obj).filter(([, value]) => typeof value !== "undefined"));
}
