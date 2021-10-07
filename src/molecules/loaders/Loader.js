// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { LoaderIcon } from "./LoaderIcon";

export function isLoading(meta, waitMutated = false) {
    return meta.loading || (waitMutated && meta.mutating);
}

export function isLoadingDone(meta, waitMutated = false) {
    return meta.loaded || meta.mutated || (!waitMutated && meta.mutating) || meta.saved;
}

export function isLoadingError(meta) {
    return meta.error;
}

export class Loader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    render() {
        const { children, className, meta = {}, waitMutated = false } = this.props;
        const { hasError } = this.state;

        const rootClassName = classnames("thc-c-loader", className);

        if (hasError) {
            return <p>Something went wrong.</p>;
        }

        if (isLoading(meta, waitMutated)) {
            return (
                <div className={rootClassName}>
                    <LoaderIcon />
                </div>
            );
        }

        if (isLoadingDone(meta, waitMutated)) {
            return children ?? null;
        }

        if (isLoadingError(meta)) {
            return <p>Something went wrong.</p>;
        }

        return null;
    }
}

Loader.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional string to display
     */
    className: PropTypes.string,
    /**
     * Meta attributes
     */
    meta: PropTypes.shape({
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        mutating: PropTypes.bool,
        mutated: PropTypes.bool,
        saving: PropTypes.bool,
        saved: PropTypes.bool,
        error: PropTypes.bool,
    }).isRequired,
    /**
     * If load for mutation
     */
    waitMutated: PropTypes.bool,
};
