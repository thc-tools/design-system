// Libs
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Components
import { ThemeProvider } from "../../core";

export function Portal({ children, container = document.body }) {
    // ThemeProvider is added without props to carryover theme information throughout portal using context
    return ReactDOM.createPortal(<ThemeProvider>{children}</ThemeProvider>, container);
}

Portal.propTypes = {
    /**
     * Children element to render
     */
    children: PropTypes.node,
    /**
     * DOM Element container
     */
    container: PropTypes.instanceOf(Element),
};
