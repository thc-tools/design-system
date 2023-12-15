// Libs
import React from "react";
import ReactDOM from "react-dom";

// Components
import { ThemeProvider } from "../../core";

export interface PortalProps extends React.PropsWithChildren<unknown> {
    /**
     * DOM Element container
     */
    container?: HTMLElement;
}

export function Portal({ children, container = document.body }: PortalProps): React.ReactPortal {
    // ThemeProvider is added without props to carryover theme information throughout portal using context
    return ReactDOM.createPortal(<ThemeProvider noDiv>{children}</ThemeProvider>, container);
}
