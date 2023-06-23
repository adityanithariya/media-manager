import React, { useEffect, useState } from "react";
import "styles/Gallary.css";
import ImageModal, { open } from "./ui/ImageModal";
import axios from "axios";

const Gallary = () => {
    const [index, setIndex] = useState(0);
    const [selectedFile, setSelectedFile] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState([]);
    useEffect(() => {
        if (uploadedFiles.length) setSelectedFile(uploadedFiles[index]);
    }, [index, uploadedFiles]);

    useEffect(() => {
        const fetchFiles = async () => {
            const { data } = await axios({
                method: "get",
                url: process.env.REACT_APP_SERVER_URL + "/media/all",
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            setUploadedFiles(data);
        };
        fetchFiles();
    }, []);

    const increaseViews = async (index) => {
        setUploadedFiles((prev) => {
            let newFiles = [...prev];
            newFiles[index].views++;
            return newFiles;
        });

        await axios({
            method: "post",
            url: process.env.REACT_APP_SERVER_URL + "/media/view/",
            data: { id: uploadedFiles[index]._id },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        });
    };

    return (
        <main className="gallary-main">
            <h3>Gallary</h3>
            <div className="gallary-content align-center">
                {uploadedFiles.length &&
                    uploadedFiles.map((element, i) => {
                        return (
                            <div
                                className="content-box align-center"
                                key={i}
                                onClick={() => {
                                    increaseViews(i);
                                    setIndex(i);
                                    setSelectedFile(element);
                                    open();
                                }}
                            >
                                <div className="content-img">
                                    <img
                                        src={element.url}
                                        height={170}
                                        alt={element.originalName}
                                    />
                                </div>
                                <div className="content-title">
                                    {element.name === ""
                                        ? element.originalName
                                        : element.name}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <ImageModal
                file={selectedFile}
                filesLength={uploadedFiles.length}
                setIndex={setIndex}
                index={index}
                increaseViews={increaseViews}
            />
        </main>
    );
};

export default Gallary;
