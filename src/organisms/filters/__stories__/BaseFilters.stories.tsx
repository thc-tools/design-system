// Libs

// Components
import { BaseDropdownFilter } from "src/design-system/organisms/filters/BaseDropdownFilter";
import { BaseFilter } from "../BaseFilter";

export default {
    title: "Design System/Organisms/Filters/BaseFilter",
    component: BaseFilter,
    args: {
        onFocus: null,
        onBlur: null,
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { BaseFilter, BaseDropdownFilter } from "@ds-tools/design-system/organisms/filters";
\`\`\`

C'est deux composants existent pour aider à construire de nouveaux filtres mais ne devraient pas directement être utilisés par une application
                `,
            },
        },
    },
};

const Template = (args) => <BaseFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    icon: "min-basket",
    label: "Toto",
    count: 4,
};

const Template2 = (args) => <BaseDropdownFilter {...args}>__BaseDropdownFilter__</BaseDropdownFilter>;

export const BaseDropdownFilterStory = Template2.bind({});
BaseDropdownFilterStory.args = {
    icon: "min-basket",
    label: "Toto",
    count: 4,
};
BaseDropdownFilterStory.storyName = "BaseDropdownFilter";
