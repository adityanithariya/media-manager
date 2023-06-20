import React, { useEffect, useRef, useState } from "react";
import "styles/UploadedFiles.css";
import moment from "moment";

const UploadCard = ({ file }) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        progressBar.current.style.setProperty("--width", progress);
    }, [progress]);
    const progressBar = useRef();
    return (
        <div className="uploadCard align-center">
            <div className="align-center">
                <img
                    src={`data:image;base64,${file.content}`}
                    alt={file.name}
                    width={180}
                />
            </div>
            <div className="align-center uploadContent">
                <div className="align-center">
                    <div>{file.name}</div>
                    <div>{moment(file.uploadedAt).fromNow()}</div>
                </div>
                <div ref={progressBar} className="progress-bar"></div>
            </div>
        </div>
    );
};

export default UploadCard;
