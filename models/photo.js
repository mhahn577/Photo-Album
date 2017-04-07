"use strict";
var mongoose = require("mongoose");
var photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Photo name is required!'],
        minlength: [3, 'Photo name must be at least 3 characters!']
    },
    description: {
        type: String,
        required: [true, 'Photo description is required!']
    },
    imageURL: {
        type: String,
        required: [false, 'Photo URL is not required.']
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Photo', photoSchema);
