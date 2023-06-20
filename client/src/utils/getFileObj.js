import getBase64 from "./getBase64";

const getFileObj = (file, res) => {
    return {
        content: getBase64(res),
        lastModified: file.lastModified,
        uploadedAt: Date.now(),
        originalName: file.name,
        size: file.size,
        name: "",
        desc: "",
    };
};

export default getFileObj;
