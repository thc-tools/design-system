import { ICONS } from "../../src/molecules/icons/Icon";

/**
 * Help fix enum detection in stories.
 * @param {object|array} values Values for enumeration.
 * @param {*} defaultValue Default value for enumeration.
 * @param {*} controlType Type for custom control.
 */
export function enumArgs(values, defaultValue, controlType = "radio", options = {}) {
    let _values = values;
    if (!Array.isArray(values)) {
        _values = Object.values(values);
    }

    return {
        control: {
            type: controlType,
            options: _values,
        },
        table: {
            defaultValue: {
                summary: defaultValue,
            },
            type: {
                summary: options.summary ?? _values.map((v) => `"${v}"`),
            },
        },
    };
}

export const iconEnumArg = enumArgs(ICONS, undefined, "select", { summary: "" });
