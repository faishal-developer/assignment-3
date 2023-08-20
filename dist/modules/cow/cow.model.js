"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowModel = void 0;
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const CowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: cow_constant_1.location,
        required: true,
    },
    breed: {
        type: String,
        enum: cow_constant_1.breed,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: cow_constant_1.level,
        required: true,
    },
    category: {
        type: String,
        enum: cow_constant_1.category,
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.CowModel = (0, mongoose_1.model)('Cow', CowSchema);
