"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warning = exports.info = exports.error = exports.success = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
exports.success = (str) => {
    console.log(log_symbols_1.default.success, chalk_1.default.green(str));
};
exports.error = (str) => {
    console.log(log_symbols_1.default.error, chalk_1.default.red(str));
};
exports.info = (str) => {
    console.log(log_symbols_1.default.info, chalk_1.default.blue(str));
};
exports.warning = (str) => {
    console.log(log_symbols_1.default.warning, chalk_1.default.magenta(str));
};
exports.default = {
    success: exports.success,
    error: exports.error,
    info: exports.info,
    warning: exports.warning,
};
