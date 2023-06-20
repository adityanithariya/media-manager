import React from "react";
import UploadCard from "./ui/UploadCard";
import { useSelector } from "react-redux";

const UploadedFiles = () => {
    const { files } = useSelector((state) => state.files);
    return (
        <main className="uploaded-main">
            <h3>File Uploads</h3>
            <div className="uploadBox align-center">
                {Object.keys(files).map((key) => (
                    <UploadCard key={key} file={files[key]} />
                ))}
            </div>
        </main>
    );
};

export default UploadedFiles;
