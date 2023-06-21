import React, { useEffect } from "react";
import UploadCard from "./ui/UploadCard";
import { useSelector } from "react-redux";
import ImageFormModal, { close, open } from "./ui/ImageFormModal";
import { useLocation } from "react-router-dom";
import UploadBtn from "./UploadBtn";

const UploadedFiles = () => {
    const { files } = useSelector((state) => state.files);
    const pathname = useLocation().search;
    useEffect(() => {
        if (pathname === "?new") {
            close();
            open();
        }
    }, [pathname]);
    return (
        <main className="uploaded-main">
            <h3>File Uploads</h3>
            {Object.keys(files).length ? (
                <div className="uploadBox align-center">
                    {Object.keys(files).map((key) => (
                        <UploadCard key={key} file={files[key]} id={key} />
                    ))}
                </div>
            ) : (
                <div className="no-file align-center">
                    <UploadBtn files={files} />
                    to see here!
                </div>
            )}
            <ImageFormModal />
        </main>
    );
};

export default UploadedFiles;
