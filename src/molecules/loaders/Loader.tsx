// Libs
import clsx from "clsx";
import React from "react";

// Components
import { LoaderIcon } from "./LoaderIcon";

export interface LoadingMeta {
    loading?: boolean;
    loaded?: boolean;
    mutating?: boolean;
    mutated?: boolean;
    saved?: boolean;
    error?: boolean;
}

export function isLoading(meta: LoadingMeta, waitMutated = false) {
    return meta.loading || (waitMutated && meta.mutating);
}

export function isLoadingDone(meta: LoadingMeta, waitMutated = false) {
    return meta.loaded || meta.mutated || (!waitMutated && meta.mutating) || meta.saved;
}

export function isLoadingError(meta: LoadingMeta) {
    return meta.error;
}

export interface LoaderProps extends React.PropsWithChildren<unknown> {
    /**
     * Additional string to display
     */
    className?: string;
    /**
     * Meta attributes
     */
    meta: LoadingMeta;
    /**
     * If load for mutation
     */
    waitMutated?: boolean;
}

export class Loader extends React.PureComponent<LoaderProps, { hasError: boolean }> {
    constructor(props: LoaderProps) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromError(_error: unknown) {
        return { hasError: true };
    }

    render() {
        const { children, className, meta = {}, waitMutated = false } = this.props;
        const { hasError } = this.state;

        const rootClassName = clsx("ds-c-loader", className);

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
