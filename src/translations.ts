// Core
import { commonTranslations } from "./core/translations";

// Molecules
import { displaysTranslations } from "./molecules/displays/translations";
import { inputsTranslations } from "./molecules/inputs/translations";

export const designSystemTranslations = {
    // Core
    ...commonTranslations,
    // Molecules
    ...displaysTranslations,
    ...inputsTranslations,
};
