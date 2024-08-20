"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCode = exports.saveCode = void 0;
const codeSchema_1 = require("../models/codeSchema");
const saveCode = async (req, res) => {
    const { code } = req.body;
    try {
        const newCode = await codeSchema_1.Code.create({
            code: code
        });
        return res.status(201).send({ url: newCode._id, message: "Code saved successfully." });
    }
    catch (error) {
        return res.status(500).send({ message: "Error in saving code.", error });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { id } = req.body;
    try {
        const existingCode = await codeSchema_1.Code.findById(id);
        if (!existingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        return res.status(200).send({ code: existingCode.code });
    }
    catch (error) {
        return res.status(500).send({ message: "Error in loading code.", error });
    }
};
exports.loadCode = loadCode;
