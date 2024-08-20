"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnection_1 = require("./lib/dbConnection");
const compilerRoutes_1 = require("./routes/compilerRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, dotenv_1.config)();
(0, dbConnection_1.dbConnection)();
app.use('/compiler', compilerRoutes_1.compilerRouter);
app.listen(4000, () => {
    console.log('Server started on port 4000');
});
