import { THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY } from "./TranslationContext";

import { ACTION_TYPE, StatusEnum } from "./enums";

export const commonTranslations = {
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.owned-by`]: "Owned by {owners}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.action-at`]: "{actionType} on: {actionAt}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.action-by`]: "{actionType} by {user}, on: {actionAt}",

    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.cancel`]: "Cancel",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.close`]: "Close",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.confirm`]: "Confirm",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.create`]: "Create",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.create-concept`]: "Create {concept}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.delete`]: "Delete",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.delete-concept`]: "Delete {concept}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.duplicate`]: "Duplicate",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.duplicate-concept`]: "Duplicate {concept}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.edit`]: "Edit",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.edit-concept`]: "Edit {concept}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.export`]: "Export",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.manage-team`]: "Manage {concept} Team",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.next`]: "Next",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.previous`]: "Previous",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.reset`]: "Reset",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.retry`]: "Retry",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.revoke`]: "Revoke",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.run`]: "Run",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.run-concept`]: "Run {concept}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.save`]: "Save",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.saved`]: "Saved",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.saving`]: "Saving...",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.see-concept`]: "See {concept}",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.show-more`]: "Show more...",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.actions.validate`]: "Validate",

    // STATUS_ENUM
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.STATUS_ENUM.${StatusEnum.Draft}`]: "Draft",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.STATUS_ENUM.${StatusEnum.InProgress}`]: "In Progress",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.STATUS_ENUM.${StatusEnum.Paused}`]: "Paused",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.STATUS_ENUM.${StatusEnum.Done}`]: "Complete !",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.STATUS_ENUM.${StatusEnum.Failed}`]: "Failed",
    // ACTION_TYPE
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.ACTION_TYPE.${ACTION_TYPE.CREATED}`]: "Created",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.ACTION_TYPE.${ACTION_TYPE.DELETED}`]: "Deleted",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.ACTION_TYPE.${ACTION_TYPE.UPLOADED}`]: "Uploaded",
    [`${THC_DESIGN_SYSTEM_COMMON_TRANSLATION_KEY}.enums.ACTION_TYPE.${ACTION_TYPE.RAN}`]: "Ran",
};
