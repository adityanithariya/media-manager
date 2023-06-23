const Media = require("../model/Media");
const User = require("../model/User");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllMedia = async (req, res) => {
    const media = await Media.find({
        owner: req.user && req.user.id,
    });
    if (!media) return res.sendStatus(204).json({ message: "No media found" });
    res.json(media);
};

const createMedia = async (req, res) => {
    if (
        !req?.body?.lastModified ||
        !req?.body?.uploadedAt ||
        !req?.body?.originalName ||
        !req?.body?.size
    ) {
        return res.sendStatus(400).json({ message: "Missing Required Fields" });
    }

    try {
        req.body.content = req.body.content.split(",")[1];
        const result = await Media.create({
            lastModified: req.body.lastModified,
            uploadedAt: req.body.uploadedAt,
            originalName: req.body.originalName,
            size: req.body.size,
            owner: req.user && req.user.id,
        });
        const user = await User.findOne({
            _id: req.user && req.user.id,
        }).exec();

        user.media.push(result);
        result.save();

        try {
            res.sendStatus(201).json(result);
        } catch (error) {
            console.log(error);
        }

        const path = `temp/${result._id}.${
            req.body.content.split(";")[0].split("/")[1]
        }`;
        fs.writeFileSync(path, req.body.content, "base64");

        const upload = await cloudinary.uploader.upload(path, {
            folder: user.username,
        });
        result.url = upload.secure_url;
        result.save();

        fs.unlinkSync(path);
    } catch (error) {
        console.log(error);
    }
};

const updateMedia = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.sendStatus(400).json({ message: "Id is required" });
        }
    } catch (error) {
        console.log(error);
    }

    const media = await Media.findOne({
        _id: req.body.id,
    }).exec();

    if (!media) {
        return res
            .status(400)
            .json({ message: `No media matches for id: ${req.body.id}` });
    }
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
    console.log(req.body.id);
    if (!req?.body?.id) {
        return res.sendStatus(400).json({ message: "Id is required" });
    }

    try {
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
    } catch (error) {
        console.log(error);
    }
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
