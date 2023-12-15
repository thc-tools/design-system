/**
 * Helper function to mock events in forms
 * @param {SyntheticEvent} originalEvent Original SyntheticEvent
 * @param {DOMEventTarget} newTarget New target
 * @param {any} newValue New value
 * @returns
 */
export function patchFormEventValue<E extends React.SyntheticEvent>(
    originalEvent: E,
    newTarget: HTMLInputElement,
    newValue: any
): E {
    const newEvent = {
        ...originalEvent,
        originalTarget: originalEvent.target,
        target: {
            ...newTarget,
            type: newTarget.type,
            name: newTarget.name,
            id: newTarget.id,
            checked: newTarget.checked,
            outerHTML: newTarget.outerHTML,
            options: (newTarget as any).options,
            multiple: newTarget.multiple,
            value: newValue,
        },
    };

    return newEvent;
}
