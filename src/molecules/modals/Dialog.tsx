// Libs
import clsx from "clsx";
import React, { useMemo } from "react";

// Components
import { DESIGN_SYSTEM_COMMON_TK, DESIGN_SYSTEM_TRANSLATION_NAMESPACE, useTranslation } from "../../core";
import { Button } from "../buttons";
import { Card, CardActions, CardContent, CardProps, CardTitle } from "../cards";
import { Modal, ModalProps } from "./Modal";

export interface DialogProps extends React.PropsWithChildren<unknown> {
    /**
     * Actions of Dialog
     */
    actions: React.ReactNode;
    /**
     *   cancelLabel: Text fot the cancel button in the actions
     */
    cancelLabel?: string;
    /**
     *  Additional className for Card
     */
    cardClassName?: string;
    /**
     * Additional className for CardContent
     */
    cardContentClassName?: string;
    /**
     * Additional props for Card
     */
    cardProps?: CardProps;
    /**
     *  Additional className for Dialog
     */
    className?: string;
    /**
     *  Boolean to display the cancel action button
     */
    hasCancel?: boolean;
    /**
     *  Props for Modal
     */
    modalProps?: ModalProps;
    /**
     *  onClose function for close the dialog
     */
    onClose?: () => void;
    /**
     *  Boolean to manage the dialog
     */
    open?: boolean;
    /**
     *  Title of the card of the dialog
     */
    title?: string;
    /**
     * Translation key
     */
    translationKey?: string;
}

export function Dialog({
    actions: actionsProp,
    cancelLabel = "actions.cancel",
    cardClassName: cardClassNameProp,
    cardProps,
    cardContentClassName: cardContentClassNameProp,
    children,
    className,
    hasCancel = true,
    modalProps,
    open,
    onClose,
    title,
    translationKey,
}: DialogProps): JSX.Element {
    const { t } = useTranslation(translationKey ?? `${DESIGN_SYSTEM_TRANSLATION_NAMESPACE}:${DESIGN_SYSTEM_COMMON_TK}`);

    const dialogClassName = clsx("ds-c-dialog", className);
    const cardClassName = clsx("ds-c-dialog__card", cardClassNameProp);
    const cardContentClassName = clsx("ds-c-dialog__card-content", cardContentClassNameProp);

    const actions = useMemo(
        () =>
            [
                hasCancel && (
                    <Button key="cancel" variant="outlined" onClick={onClose}>
                        {t(cancelLabel)}
                    </Button>
                ),
                ...(Array.isArray(actionsProp) ? actionsProp : [actionsProp]),
            ].filter(Boolean),
        [actionsProp, hasCancel, cancelLabel, onClose, t]
    );

    return (
        <Modal {...modalProps} className={dialogClassName} onClose={onClose} open={open}>
            <Card {...cardProps} className={cardClassName}>
                {title && <CardTitle title={title} />}
                <div>
                    <CardContent className={cardContentClassName}>{children}</CardContent>
                </div>
                <CardActions>{actions}</CardActions>
            </Card>
        </Modal>
    );
}
