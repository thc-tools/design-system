// Libs
import React, { useCallback, useState } from "react";

// Components
import { RouterDecorator } from "../../../../.storybook/utils/Decorators";
import { Button } from "../../../molecules/buttons";
import { removeUndefinedKeys } from "../../utils";
import { useModalHandler } from "../useModalHandler.hook";

const MODAL_QS = ["toto", "tata"];
function ModalHandler() {
    const [inc, setInc] = useState(0);
    const incInc = useCallback(() => setInc((_inc) => _inc + 1), [setInc]);

    const [value, setValue] = useModalHandler(MODAL_QS, incInc, false);

    return (
        <>
            <div>{`Modal has been closed ${inc} times`}</div>
            <div>{`Modal is open ${value ? "true" : "false"}`}</div>
            <div>{`Modal value is ${JSON.stringify(value)}`}</div>
            <Button
                onClick={() =>
                    setValue(
                        Object.keys(removeUndefinedKeys(value)).length > 0
                            ? { toto: undefined, tata: undefined }
                            : { toto: "123", tata: "456" }
                    )
                }
            >
                Toggle modal
            </Button>
        </>
    );
}

export default {
    title: "Design System/Core/Hooks/useModalHandler (test)",
    component: ModalHandler,
    args: {},
    argTypes: {},
    decorators: [RouterDecorator],
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { useModalHandler } from "@thc-tools/design-system/core/hooks"
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => (
    <>
        <ModalHandler {...args} />
        <hr />
        <ModalHandler {...args} />
    </>
);

export const Primary = Template.bind({});
Primary.args = {};
