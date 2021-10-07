// Libs
import React from "react";
import { useFormik } from "formik";

// Components
import { Form } from "../../forms";
import { FilterLabel } from "../FilterLabel";

export default {
    title: "Design System/Organisms/Filters/FilterLabel",
    component: FilterLabel,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { FilterLabel } from "@thc-tools/design-system/organisms/filters"
\`\`\`
                `,
            },
        },
    },
};

function Template(args) {
    const formik = useFormik({
        initialValues: {
            order: "asc",
        },
    });

    return (
        <Form formik={formik}>
            <code>
                <pre>Current value is: {JSON.stringify(formik.values, null, 4)}</pre>
            </code>
            <hr />

            <FilterLabel
                {...args}
                onSortClick={(newOrder) => formik.setFieldValue("order", newOrder)}
                sortOrder={formik.values["order"]}
            />
        </Form>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
    label: "text filter",
};
