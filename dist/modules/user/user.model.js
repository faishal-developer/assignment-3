"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.role = void 0;
const mongoose_1 = require("mongoose");
exports.role = ["seller", "buyer"];
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: exports.role,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
