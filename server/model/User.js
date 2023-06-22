const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    media: [{
        type: Schema.Types.ObjectId,
        ref: "Media",
    }],
});

module.exports = mongoose.model("User", userSchema);
