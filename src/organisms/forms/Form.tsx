// Libs
import classnames from "classnames";
import React from "react";

// Components
import { Form as FormikForm, FormikProvider, useFormik } from "formik";
import { FieldContainer } from "./FieldContainer";

export interface FormProps extends React.PropsWithChildren<{}> {
    /**
     * Additional className for form
     */
    className?: string;
    /**
     * Dumps values of form
     */
    debug?: boolean;
    /**
     * Formik bag
     */
    formik: ReturnType<typeof useFormik<any>>;
    /**
     * If should not put default FieldContainer
     */
    noFieldContainer?: boolean;
    /**
     * If HTML5 validation is disabled
     */
    noValidate?: boolean;
}

export function Form({
    children,
    className,
    debug = false,
    formik,
    noFieldContainer = false,
    noValidate = true,
    ...otherProps
}: FormProps) {
    const formClassName = classnames("thc-c-form", className);

    let child = children;
    if (!noFieldContainer) {
        child = <FieldContainer orientation="vertical">{child}</FieldContainer>;
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
