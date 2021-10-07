import "./index.css";
import "../src/initialize";
import { ThemeDecorator, TranslationDecorator } from "./utils/Decorators";

const cssReq = require.context("!!raw-loader!../src/", true, /.\.css$/);
const cssTokenFiles = cssReq.keys().map((filename) => ({ filename, content: cssReq(filename).default }));

export const parameters = {
    viewMode: "docs",
    previewTabs: { "storybook/docs/panel": { index: -1 } },
    actions: { argTypesRegex: "^on[A-Z].*" },
    designToken: {
        files: {
            css: cssTokenFiles,
        },
    },
    options: {
        storySort: {
            method: (a, b) =>
                a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
            order: [
                "Design System",
                ["Introduction", "How To(s)", "Core", "Quarks", "Atoms", "Molecules", "Organisms"],
            ],
        },
    },
};

export const globalTypes = {
    theme: {
        name: "Theme",
        description: "Global theme for components",
        defaultValue: "light",
        toolbar: {
            icon: "paintbrush",
            items: ["light", "dark"],
        },
    },
};

export const decorators = [ThemeDecorator, TranslationDecorator];
