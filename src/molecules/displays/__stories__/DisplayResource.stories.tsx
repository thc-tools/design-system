// Libs

// Components
import { Icons } from "../../icons";
import { DisplayResource, DisplayResourceStatus } from "../DisplayResource";

export default {
    title: "Design System/Molecules/Displays/DisplayResource",
    component: DisplayResource,
    args: {
        label: "I'm label for that display",
        helper: "I'm helper for that display",
    },
    parameters: {
        docs: {
            description: {
                component: `
Displays allow user to structured information about an entity.

While included here as a standalone component, the most common use will be in some of resource card.

\`\`\`js
import { DisplayResource } from "@ds-tools/design-system/molecules/displays"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <DisplayResource {...args} />;

export const Primary = Template.bind({});

const VARIATION_ICONS: Record<DisplayResourceStatus, Icons> = {
    info: "info",
    success: "success",
    warning: "warning",
    error: "error",
};

export function Variations() {
    const CustomDisplayResource = ({
        status = "info",
        disabled,
        ...otherProps
    }: {
        status?: DisplayResourceStatus;
        disabled?: boolean;
    }) => (
        <Template
            {...otherProps}
            status={status}
            disabled={disabled}
            icon={VARIATION_ICONS[status]}
            label={`I'm label for that ${status ?? ""}${disabled ? "disabled" : ""} display`}
            helper={`I'm helper for that ${status ?? ""}${disabled ? "disabled" : ""} display`}
        />
    );

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            <CustomDisplayResource />
            <CustomDisplayResource disabled />
            {Object.values(Object.keys(VARIATION_ICONS)).map((status) => (
                <CustomDisplayResource key={status} status={status as DisplayResourceStatus} />
            ))}
        </div>
    );
}

Variations.parameters = {
    controls: { disabled: true },
    docs: {
        description: {
            story: "⚠️ Caution here icons are added manually",
        },
    },
};
