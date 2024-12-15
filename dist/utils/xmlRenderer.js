"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeXML = exports.renderXML = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xmlCache = {};
const renderXML = (file, params) => {
    if (!xmlCache[file]) {
        const filePath = path_1.default.resolve(__dirname, '../xml', `${file}.xml`);
        xmlCache[file] = fs_1.default.readFileSync(filePath, 'utf8');
    }
    return Object.entries(params).reduce((xml, [key, value]) => xml.replace(new RegExp(`:${key}`, 'g'), value), xmlCache[file]);
};
exports.renderXML = renderXML;
const escapeXML = (text) => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};
exports.escapeXML = escapeXML;
//# sourceMappingURL=xmlRenderer.js.map