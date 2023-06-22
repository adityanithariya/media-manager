const Media = require("../model/Media");
const User = require("../model/User");

const addMedia = async (req, res) => {
    if (!req?.params?.id) {
        return res.sendStatus(400).json({ message: "Id is required" });
    }
    const media = await Media.findOne({
        _id: req.params.id,
    }).exec();

    const user = await User.findOne({
        _id: req.user && req.user.id,
    }).exec();

    user.media.push(media);
    user.save();
    res.json({ message: "Media added to user" });
};
