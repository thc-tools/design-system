// Libs
import React from "react";
import { useFormik } from "formik";

// Components
import { Form } from "../../forms";
import { TextFilter } from "../TextFilter";

export default {
    title: "Design System/Organisms/Filters/TextFilter",
    component: TextFilter,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { TextFilter } from "@thc-tools/design-system/organisms/filters"
\`\`\`
                `,
            },
        },
    },
};

function Template(args) {
    const formik = useFormik({
        initialValues: {
            text: "",
            textOrder: "asc",
        },
    });

    return (
        <Form formik={formik}>
            <code>
                <pre>Current value is: {JSON.stringify(formik.values, null, 4)}</pre>
            </code>
            <hr />
            <TextFilter {...args} name="text" />
        </Form>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
    label: "text filter",
};
