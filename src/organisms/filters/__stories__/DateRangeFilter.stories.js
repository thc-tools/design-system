// Libs
import React from "react";
import { useFormik } from "formik";

// Components
import { Form } from "../../forms";
import { DateRangeFilter } from "../DateRangeFilter";

export default {
    title: "Design System/Organisms/Filters/DateRangeFilter",
    component: DateRangeFilter,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { DateRangeFilter } from "@thc-tools/design-system/organisms/filters"
\`\`\`
                `,
            },
        },
    },
};

function Template(args) {
    const formik = useFormik({
        initialValues: {
            range: { startDate: undefined, endDate: undefined },
            rangeOrder: "asc",
        },
    });

    return (
        <Form formik={formik}>
            <code>
                <pre>Current value is: {JSON.stringify(formik.values, null, 4)}</pre>
            </code>
            <hr />
            <DateRangeFilter {...args} name="range" />
        </Form>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
    label: "range filter",
};
