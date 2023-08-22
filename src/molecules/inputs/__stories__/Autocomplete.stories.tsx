// Libs
import React, { useState } from "react";
// Components
import { Autocomplete } from "../Autocomplete";

export default {
    title: "Design System/Molecules/Inputs/Autocomplete",
    component: Autocomplete,
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Autocomplete, AutocompleteField } from "@thc-tools/design-system/molecules/inputs"
\`\`\`
                `,
            },
        },
    },
};

function Template({ value: valueProp, ...args }) {
    const [value, setValue] = useState(valueProp);
    const onChange = (event) => setValue(event.target.value);

    return (
        <>
            <p>value: {value}</p>
            <Autocomplete {...args} value={value} onChange={onChange} />
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
    labelResolver: ({ value }) => Promise.resolve(`resolver ${value}`),
};
