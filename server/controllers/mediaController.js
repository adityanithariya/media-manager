const Media = require("../model/Media");

const getAllMedia = async (req, res) => {
    if (!req?.body?.owner) {
        return res.sendStatus(400).json({ message: "Owner is required" });
    }
    const media = await Media.find({
        owner: req.body.owner,
    });
    if (!media) return res.sendStatus(204).json({ message: "No media found" });
    res.json(media);
};

const createMedia = async (req, res) => {
    if (
        !req?.body?.content ||
        !req?.body?.lastModified ||
        !req?.body?.uploadedAt ||
        !req?.body?.originalName ||
        !req?.body?.size ||
        !req?.body?.owner
    ) {
        return res.sendStatus(400).json({ message: "Missing Required Fields" });
    }

    try {
        const result = await Media.create({
            content: req.body.content,
            lastModified: req.body.lastModified,
            uploadedAt: req.body.uploadedAt,
            originalName: req.body.originalName,
            size: req.body.size,
            owner: req.body.owner,
        });
        const user = await User.findOne({
            _id: req.user && req.user.id,
        }).exec();

        user.media.push(result);
        result.save();

        res.sendStatus(201).json(result);
    } catch (error) {
        console.log(error);
    }
};

const updateMedia = async (req, res) => {
    if (!req?.body?.id) {
        return res.sendStatus(400).json({ message: "Id is required" });
    }

    const media = await Media.findOne({
        _id: req.body.id,
    }).exec();

    if (!media) {
        return res
            .status(400)
            .json({ message: `No media matches for id: ${req.body.id}` });
    }
    if (req.body?.content) media.content = req.body.content;
    if (req.body?.lastModified) media.lastModified = req.body.lastModified;
    if (req.body?.uploadedAt) media.uploadedAt = req.body.uploadedAt;
    if (req.body?.originalName) media.originalName = req.body.originalName;
    if (req.body?.size) media.size = req.body.size;
    if (req.body?.name) media.name = req.body.name;
    if (req.body?.desc) media.desc = req.body.desc;
    if (req.body?.views) media.views = req.body.views;
    if (req.body?.owner) media.owner = req.body.owner;
    const result = await media.save();
    res.json(result);
};

const increaseViews = async (req, res) => {
    if (!req?.body?.id) {
        return res.sendStatus(400).json({ message: "Id is required" });
    }

    const media = await Media.findOne({
        _id: req.body.id,
    }).exec();

    if (!media) {
        return res
            .status(400)
            .json({ message: `No media matches for id: ${req.body.id}` });
    }
    media.views = media.views + 1;
    const result = await media.save();
    res.json(result);
};

const getMedia = async (req, res) => {
    if (!req?.params?.id) {
        return res.sendStatus(400).json({ message: "Id is required" });
    }
    const media = await Media.findOne({
        _id: req.params.id,
    }).exec();

    if (!media) {
        return res
            .status(400)
            .json({ message: `No media matches with id: ${req.params.id}` });
    }
    res.json(media);
};

module.exports = {
    getAllMedia,
    createMedia,
    getMedia,
    increaseViews,
    updateMedia,
};
