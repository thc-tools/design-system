// Libs
import React from "react";
import { useFormik } from "formik";

// Components
import { Form } from "../../forms";
import { SelectCheckboxFilter } from "../SelectCheckboxFilter";

export default {
    title: "Design System/Organisms/Filters/SelectCheckboxFilter",
    component: SelectCheckboxFilter,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { SelectCheckboxFilter } from "@thc-tools/design-system/organisms/filters"
\`\`\`
                `,
            },
        },
    },
};

function Template(args) {
    const formik = useFormik({
        initialValues: {
            boxes: [],
            boxesOrder: "asc",
        },
    });

    return (
        <Form formik={formik}>
            <code>
                <pre>Current value is: {JSON.stringify(formik.values, null, 4)}</pre>
            </code>
            <hr />
            <SelectCheckboxFilter {...args} name="boxes" />
        </Form>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
    label: "checkboxes filter",
    hasSelectAll: true,
    options: [
        { value: "cbk", label: "Cédric BOULET KESSLER" },
        { value: "av", label: "Amélie VIOLLET" },
        { value: "am", label: "Hana MOUJOU" },
        { value: "mnb", label: "Marie-Noëlle NEBOR" },
    ],
};
