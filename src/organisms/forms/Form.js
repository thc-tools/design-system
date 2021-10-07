// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Form as FormikForm, FormikProvider } from "formik";
import { FieldContainer, FIELD_CONTAINER_ORIENTATION } from "./FieldContainer";

export function Form({
    children,
    className,
    debug = false,
    formik,
    noFieldContainer = false,
    noValidate = true,
    ...otherProps
}) {
    const formClassName = classnames("thc-c-form", className);

    let child = children;
    if (!noFieldContainer) {
        child = <FieldContainer orientation={FIELD_CONTAINER_ORIENTATION.VERTICAL}>{child}</FieldContainer>;
    }

    return (
        <FormikProvider value={formik}>
            <FormikForm className={formClassName} noValidate={noValidate} {...otherProps}>
                {debug && (
                    <div
                        style={{
                            backgroundColor: "pink",
                            padding: "10px",
                            marginBottom: "20px",
                            overflow: "auto",
                            borderRadius: "5px",
                            border: "1px solid red",
                            maxHeight: "400px",
                        }}
                    >
                        <div>Form debug:</div>
                        <ul>
                            <li>
                                <div>Values:</div>
                                <pre>
                                    <code>{JSON.stringify(formik.values, null, 4)}</code>
                                </pre>
                            </li>
                            <li>
                                <div>Errors:</div>
                                <pre>
                                    <code>{JSON.stringify(formik.errors, null, 4)}</code>
                                </pre>
                            </li>
                            <li>
                                <div>Touched:</div>
                                <pre>
                                    <code>{JSON.stringify(formik.touched, null, 4)}</code>
                                </pre>
                            </li>
                        </ul>
                    </div>
                )}
                {child}
            </FormikForm>
        </FormikProvider>
    );
}

FormikForm.propTypes = {
    /**
     * Children for form
     */
    children: PropTypes.node,
    /**
     * Additional className for form
     */
    className: PropTypes.string,
    /**
     * Dumps values of form
     */
    debug: PropTypes.bool,
    /**
     * Formik bag
     */
    // eslint-disable-next-line react/forbid-prop-types
    formik: PropTypes.object,
    /**
     * If HTML5 validation is disabled
     */
    noValidate: PropTypes.bool,
};
