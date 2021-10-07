// Libs
const path = require("path");
const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const { parse } = require("svg-parser");

const ICONS_PATH = path.join(__dirname, "../src/molecules/icons/raw-icons");
const ICONS_MOLECULE_PATH = path.join(__dirname, "../src/molecules/icons");

function extractTraces(fileName) {
    const iconPath = path.join(ICONS_PATH, fileName);
    const iconContent = fs.readFileSync(iconPath);
    const iconParsed = parse(iconContent.toString());

    // => svg/path[d]
    const traces = iconParsed.children[0].children.map((path) => path.properties.d);

    return traces;
}

function main() {
    fs.readdir(ICONS_PATH, (err, files) => {
        if (err) {
            process.exit(-1);
        }

        const filteredFiles = files.filter((file) => file.endsWith(".svg"));

        const traces = filteredFiles.reduce(
            (acc, file) => ({ ...acc, [file.replace(".svg", "")]: extractTraces(file) }),
            {}
        );

        const data = JSON.stringify(traces);

        fs.writeFileSync(path.join(ICONS_MOLECULE_PATH, "icons.json"), data);
    });
}

main();
