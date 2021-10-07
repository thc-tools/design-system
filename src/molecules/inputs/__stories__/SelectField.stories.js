// Libs
import React, { useState } from "react";

// Components
import { Field } from "../Field";
import { Select, SelectField } from "../Select";

export default {
    title: "Design System/Molecules/Inputs/SelectField",
    component: Select,
    subcomponents: { Field },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Select, SelectField } from "@thc-tools/design-system/molecules/inputs";
\`\`\`
                `,
            },
        },
    },
};

function generateBetween(start, end) {
    const array = [];
    for (let i = start; i <= end; i++) {
        array.push(i);
    }

    return array;
}

const options = generateBetween(1, 10).map((i) => ({ label: `Option ${i}`, value: `${i}` }));

export const Primary = () => {
    const [value, setValue] = useState();
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <SelectField
            label="Select"
            name="select"
            helperText="I am information"
            id="select"
            inputProps={{ endAdornment: "Kg", placeholder: "Select value...", startAdornment: "search" }}
            onChange={onChange}
            options={options}
            value={value}
        />
    );
};
