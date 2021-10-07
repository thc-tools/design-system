// Libs
import { useFormik } from "formik";
import React from "react";

// Components
import { SepiaThemeDecorator } from "../../../../.storybook/utils/Decorators";

import { Form, Field } from "../index";

export default {
    title: "Design System/Organisms/Form",
    component: Form,
    decorators: [SepiaThemeDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
// Libs
import { useFormik } from "formik";

// Components
import { Form } from "@thc-tools/design-system/organisms/forms"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ multiLabelResolver, options, querySearcher, simpleLabelResolver, ...args }) => {
    const formik = useFormik({
        initialValues: {
            name: "Amélie",
            number: 0,
            hobbies: [],
            a_hobbies: [],
        },
    });
    return (
        <Form formik={formik} {...args} debug>
            <Field label="name" name="name" required />
            <Field label="number" max={5} min={-2} name="number" type="number" required />
            <Field label="hobby" name="hobby" options={options} />
            <Field label="hobbies" name="hobbies" options={options} multiple />
            <Field
                label="hobby (autocomplete)"
                labelResolver={simpleLabelResolver}
                name="a_hobby"
                querySearcher={querySearcher}
            />
            <Field
                label="hobbies (autocomplete)"
                labelResolver={multiLabelResolver}
                multiple
                name="a_hobbies"
                querySearcher={querySearcher}
            />
        </Form>
    );
};

const options = [
    {
        label: "Music",
        value: "m",
    },
    {
        label: "Rafael Nadal 😍",
        value: "rn",
    },
    {
        label: "Figure skating",
        value: "fs",
    },
];

export const Primary = Template.bind({});
Primary.args = {
    options,
    simpleLabelResolver: ({ value }) => Promise.resolve(options.find((opt) => opt.value === value).label),
    multiLabelResolver: ({ values }) =>
        Promise.resolve(values?.map((value) => options.find((opt) => opt.value === value))),
    querySearcher: ({ filter }) => Promise.resolve(options.filter(() => filter !== "empty")),
};
