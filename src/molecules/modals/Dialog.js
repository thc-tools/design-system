// Libs
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { useTranslation, THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY } from "../../core";
import { Button } from "../buttons";
import { Card, CardActions, CardContent, CardTitle } from "../cards";
import { Modal } from "./Modal";

export function Dialog({
    actions: actionsProp,
    cancelLabel = "actions.cancel",
    cardClassName: cardClassNameProp,
    cardProps,
    children,
    className,
    cardContentClassName: cardContentClassNameProp,
    hasCancel = true,
    modalClassName: modalClassNameProp,
    modalProps,
    open,
    onClose,
    title,
    translationKey,
    ...otherProps
}) {
    const { translate } = useTranslation(translationKey ?? THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY);

    const dialogClassName = classnames("thc-c-dialog", className);
    const modalClassName = classnames("thc-c-dialog__modal", modalClassNameProp);
    const cardClassName = classnames("thc-c-dialog__card", cardClassNameProp);
    const cardContentClassName = classnames("thc-c-dialog__card-content", cardContentClassNameProp);

    const actions = useMemo(
        () =>
            [
                hasCancel && (
                    <Button key="cancel" type="secondary" onClick={onClose}>
                        {translate(cancelLabel)}
                    </Button>
                ),
                ...(Array.isArray(actionsProp) ? actionsProp : [actionsProp]),
            ].filter(Boolean),
        [actionsProp, hasCancel, cancelLabel, onClose, translate]
    );

    return (
        <div {...otherProps} className={dialogClassName}>
            <Modal {...modalProps} className={modalClassName} onClose={onClose} open={open}>
                <Card {...cardProps} className={cardClassName}>
                    {title && <CardTitle title={title} />}
                    <CardContent className={cardContentClassName}>{children}</CardContent>
                    <CardActions>{actions}</CardActions>
                </Card>
            </Modal>
        </div>
    );
}

Dialog.propTypes = {
    /**
     *  actionsAdornment: Button actions of the dialog
     */
    actionsAdornment: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    /**
     *   cancelLabel: Text fot the cancel button in the actions
     */
    cancelLabel: PropTypes.string,
    /**
     *  Additional className for Card
     */
    cardClassName: PropTypes.string,
    /**
     * Additional props for Card
     */
    cardProps: PropTypes.shape(Card.propTypes),
    /**
     *  Content of the dialog
     */
    children: PropTypes.node,
    /**
     *  Additional className for Dialog
     */
    className: PropTypes.string,
    /**
     *  Additional className for the content
     */
    contentClassName: PropTypes.string,
    /**
     *  Boolean to display the cancel action button
     */
    hasCancel: PropTypes.bool,
    /**
     *  Additional className for Modal
     */
    modalClassName: PropTypes.string,
    /**
     *  Props for Modal
     */
    modalProps: PropTypes.shape(Modal.propTypes),
    /**
     *  onClose function for close the dialog
     */
    onClose: PropTypes.func,
    /**
     *  Boolean to manage the dialog
     */
    open: PropTypes.bool,
    /**
     *  Title of the card of the dialog
     */
    title: PropTypes.string,
    /**
     * Translation key
     */
    translationKey: PropTypes.string,
};
