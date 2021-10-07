// Libs
import PropTypes from "prop-types";

export function TabPanel({ children, currentValue, value }) {
    if (value !== currentValue) {
        return null;
    }

    return children;
}

TabPanel.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Current currentValue
     */
    currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Value for Tab
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
