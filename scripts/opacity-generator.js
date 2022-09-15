/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const chroma = require("chroma-js");

const white = "#FFFFFF";
const dark = "#333333";

const colors = {
    blue: "#3DA1EA",
    skyblue: "#34DDF3",
    green: "#59C159",
    orange: "#FAA546",
    red: "#DD5050",
};

const colorsOpacity = {
    white: "#ffffff",
    black: "#333333",
};

const colorsDataviz = {
    blue: "#32A0F3",
    skyblue: "#65D7EB",
    green: "#67D367",
    yellow: "#F4CF28",
    orange: "#FFB057",
    red: "#FF7171",
    purple: "#BA8BF1",
    pink: "#F8A9E4",
    brown: "#AB7B54",
    grey: "#C2C2C2",
};

const hexaTransparency = {
    100: "FF",
    90: "E5",
    80: "CC",
    70: "B2",
    60: "99",
    50: "7F",
    40: "66",
    30: "4C",
    20: "33",
    10: "19",
    0: "00",
};

function printSectionHeader(name, theme) {
    console.log("/**");
    console.log(` * ${name}`);
    console.log(" */");
    console.log(`${theme === "light" ? ":root, " : ""}.ds-theme--${theme} {`);
}

function printSectionFooter() {
    console.log("}");
}

function printSectionPalette(colors, prefix, base = white) {
    Object.entries(colors).forEach(([colorKey, colorValue], i) => {
        const colorPalette = chroma.scale([base, colorValue]).colors(11);

        colorPalette.forEach((colorHexaValue, i) => {
            console.log(`    ${prefix}${colorKey}-${i * 10}: ${colorHexaValue};`);
        });

        if (i < Object.keys(colors).length - 1) {
            console.log("");
        }
    });
}

function printSectionOpacity(colors, prefix) {
    Object.entries(colors).forEach(([colorKey, colorValue], i) => {
        const colorHexas = Object.entries(hexaTransparency).reduce(
            (acc, [hexaTransparencyKey, hexaTransparencyValue]) => {
                return { ...acc, [`${colorKey}-${hexaTransparencyKey}`]: `${colorValue}${hexaTransparencyValue}` };
            },
            {}
        );

        Object.entries(colorHexas).forEach(([colorHexaKey, colorHexaValue]) => {
            console.log(`    ${prefix}${colorHexaKey}: ${colorHexaValue};`);
        });

        if (i < Object.keys(colors).length - 1) {
            console.log("");
        }
    });
}

console.log("/* ----------- */");
console.log("/* DO NOT EDIT */");
console.log("/* ----------- */");

console.log("/* Colors generated with scripts/opacity-generator.js */");
console.log("");

printSectionHeader("Colors (light)", "light");
printSectionPalette(colors, "--ds-color--");
printSectionFooter();
console.log("");

printSectionHeader("Colors (dark)", "dark");
printSectionPalette(colors, "--ds-color--", dark);
printSectionFooter();
console.log("");

printSectionHeader("Colors Opacity", "light");
printSectionOpacity(colorsOpacity, "--ds-color--");
printSectionFooter();
console.log("");

printSectionHeader("Colors Dataviz", "light");
printSectionPalette(colorsDataviz, "--ds-colorDataviz--");
printSectionFooter();
