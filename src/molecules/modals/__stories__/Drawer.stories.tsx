// Libs
import { useState } from "react";

// Components
import { Button } from "../../buttons";
import { Drawer } from "../Drawer";
import { DrawerAwareContainer } from "../DrawerAwareContainer";

export default {
    title: "Design System/Molecules/Modals/Drawer",
    component: Drawer,
    args: {
        anchor: DRAWER_ANCHOR.RIGHT,
        content: "Drawer content",
    },
    parameters: {
        docs: {
            description: {
                component: `
Navigation drawers provide access to destinations and app functionality, such as switching accounts. They can either be permanently on-screen or controlled by a navigation menu icon.

\`\`\`js
import { Drawer } from "@thc-tools/design-system/molecules/modals"
\`\`\`
                `,
            },
        },
    },
};

const Template = ({ content, open: openProp, ...otherProps }) => {
    const [open, setOpen] = useState(openProp ?? false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open drawer</Button>
            <Drawer {...otherProps} open={open} onClose={() => setOpen(false)}>
                <div style={{ minHeight: "200px", minWidth: "200px", padding: "10px" }}>{content}</div>
            </Drawer>
        </>
    );
};

export const Primary = Template.bind({});

export function Persistent() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(!open)}>Open drawer</Button>
            <DrawerAwareContainer
                drawer={
                    <Drawer onClose={() => setOpen(false)} type={DRAWER_TYPE.PERSISTENT}>
                        <div style={{ minHeight: "200px", minWidth: "200px", padding: "10px" }}>__DrawerContent__</div>
                    </Drawer>
                }
                open={open}
            >
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at
                    ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis
                    convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
                    sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
                    quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris
                    commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue
                    eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </div>
            </DrawerAwareContainer>
        </>
    );
}
