const getFileObj = (file, res) => {
    return {
        content: res,
        lastModified: file.lastModified,
        uploadedAt: Date.now(),
        originalName: file.name,
        size: file.size,
        name: "",
        desc: "",
        views: 0,
        url: "",
        progress: 0,
    };
};

export default getFileObj;
