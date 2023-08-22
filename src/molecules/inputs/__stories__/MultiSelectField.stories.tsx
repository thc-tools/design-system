// Libs
// Libs
import React, { useState } from "react";

// Components
import { Field } from "../Field";
import { MultiSelect, MultiSelectField } from "../MultiSelect";

export default {
    title: "Design System/Molecules/Inputs/MultiSelectField",
    component: MultiSelect,
    subcomponents: { Field },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { MultiSelect, MultiSelectField } from "@thc-tools/design-system/molecules/inputs";
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

const options = generateBetween(1, 5).map((i) => ({ label: `Option ${i}`, value: `${i}` }));

export const Primary = () => {
    const [value, setValue] = useState([]);
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <MultiSelectField
            label="Select"
            name="select"
            helperText="I am information"
            id="select"
            inputProps={{ endAdornment: "Kg", placeholder: "Select multiple values...", startAdornment: "search" }}
            onChange={onChange}
            options={options}
            value={value}
        />
    );
};
