const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    lastModified: {
        type: Number,
        required: true,
    },
    uploadedAt: {
        type: Number,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "",
    },
    views: {
        type: Number,
        default: 0,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Media", mediaSchema);
