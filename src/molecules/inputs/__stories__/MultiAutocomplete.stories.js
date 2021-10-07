// Libs
import React, { useState } from "react";
// Components
import { MultiAutocomplete } from "../MultiAutocomplete";

export default {
    title: "Design System/Molecules/Inputs/MultiAutocomplete",
    component: MultiAutocomplete,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { MultiAutocomplete, MultiAutocompleteField } from "@thc-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ value: valueProp = [], ...args }) {
    const [value, setValue] = useState(valueProp);
    const onChange = (event) => setValue(event.target.value);

    return (
        <>
            <p>values: {value.join(", ")}</p>
            <MultiAutocomplete {...args} value={value} onChange={onChange} />
        </>
    );
}

export const Primary = Template.bind({});
Primary.args = {
    id: Math.random(),
    name: Math.random().toString(),
    querySearcher: ({ filter }) =>
        Promise.resolve(
            [
                { label: "toto", value: 1 },
                { label: "lala", value: 2 },
                { label: filter, value: 3 },
            ].filter(() => filter !== "empty")
        ),
    labelResolver: ({ values }) => Promise.resolve(values.map((value) => ({ value, label: `resolver ${value}` }))),
};
