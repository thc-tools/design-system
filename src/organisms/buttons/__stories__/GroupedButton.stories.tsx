// Libs

import { GroupedButton } from "src/design-system/organisms/buttons/GroupedButton";

// Components

export default {
    title: "Design System/Organisms/GroupedButton",
    component: GroupedButton,
    args: {
        label: "Grouped button",
        iconSize: "m",
        iconPosition: "left",
        onClick: () => alert("button clicked"),
        type: "primary",
        actions: [
            {
                key: "action-1",
                label: "click-me",
                icon: "drop",
            },
        ],
    },
    parameters: {
        docs: {
            description: {
                component: ``,
            },
        },
    },
};

const Template = (args) => <GroupedButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export function Types(props) {
    return (
        <>
            <div style={{ display: "flex", gap: 10 }}>
                <GroupedButton
                    {...props}
                    variant="outlined"
                    leftButtonProps={props.leftButtonProps}
                    rightButtonProps={props.rightButtonProps}
                    dropdownProps={{}}
                    dropDownContent={props.dropDownContent}
                />
                <GroupedButton
                    {...props}
                    variant="caution"
                    leftButtonProps={props.leftButtonProps}
                    rightButtonProps={props.rightButtonProps}
                    dropdownProps={{}}
                    dropDownContent={props.dropDownContent}
                />
                <GroupedButton
                    {...props}
                    leftButtonProps={props.leftButtonProps}
                    rightButtonProps={props.rightButtonProps}
                    dropdownProps={{}}
                    dropDownContent={props.dropDownContent}
                />
            </div>
            <br />
            <div style={{ display: "flex", gap: 10 }}>
                <GroupedButton
                    disabled
                    variant="primary"
                    {...props}
                    leftButtonProps={props.leftButtonProps}
                    rightButtonProps={props.rightButtonProps}
                    dropdownProps={{}}
                    dropDownContent={props.dropDownContent}
                />
                <GroupedButton
                    disabled
                    variant="caution"
                    {...props}
                    leftButtonProps={props.leftButtonProps}
                    rightButtonProps={props.rightButtonProps}
                    dropdownProps={{}}
                    dropDownContent={props.dropDownContent}
                />
                <GroupedButton
                    disabled
                    variant="outlined"
                    {...props}
                    leftButtonProps={props.leftButtonProps}
                    rightButtonProps={props.rightButtonProps}
                    dropdownProps={{}}
                    dropDownContent={props.dropDownContent}
                />
            </div>
        </>
    );
}
