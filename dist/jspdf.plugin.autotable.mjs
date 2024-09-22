Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = exports.Column = exports.Row = exports.Table = exports.CellHookData = exports.__drawTable = exports.__createTable = exports.applyPlugin = void 0;
const tslib_1 = require("tslib");
const applyPlugin_1 = tslib_1.__importDefault(require("./applyPlugin"));
const inputParser_1 = require("./inputParser");
const tableDrawer_1 = require("./tableDrawer");
const tableCalculator_1 = require("./tableCalculator");
const models_1 = require("./models");
Object.defineProperty(exports, "Table", { enumerable: true, get: function () { return models_1.Table; } });
const HookData_1 = require("./HookData");
Object.defineProperty(exports, "CellHookData", { enumerable: true, get: function () { return HookData_1.CellHookData; } });
const models_2 = require("./models");
Object.defineProperty(exports, "Cell", { enumerable: true, get: function () { return models_2.Cell; } });
Object.defineProperty(exports, "Column", { enumerable: true, get: function () { return models_2.Column; } });
Object.defineProperty(exports, "Row", { enumerable: true, get: function () { return models_2.Row; } });
// export { applyPlugin } didn't export applyPlugin
// to index.d.ts for some reason
function applyPlugin(jsPDF) {
    (0, applyPlugin_1.default)(jsPDF);
}
exports.applyPlugin = applyPlugin;
function autoTable(d, options) {
    const input = (0, inputParser_1.parseInput)(d, options);
    const table = (0, tableCalculator_1.createTable)(d, input);
    (0, tableDrawer_1.drawTable)(d, table);
}
// Experimental export
function __createTable(d, options) {
    const input = (0, inputParser_1.parseInput)(d, options);
    return (0, tableCalculator_1.createTable)(d, input);
}
exports.__createTable = __createTable;
function __drawTable(d, table) {
    (0, tableDrawer_1.drawTable)(d, table);
}
exports.__drawTable = __drawTable;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let jsPDF = require('jspdf');
    // Webpack imported jspdf instead of jsPDF for some reason
    // while it seemed to work everywhere else.
    if (jsPDF.jsPDF)
        jsPDF = jsPDF.jsPDF;
    applyPlugin(jsPDF);
}
catch (error) {
    // Importing jspdf in nodejs environments does not work as of jspdf
    // 1.5.3 so we need to silence potential errors to support using for example
    // the nodejs jspdf dist files with the exported applyPlugin
}
exports.default = autoTable;
