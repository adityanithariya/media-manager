import React, { useRef } from "react";
import "styles/UploadedFiles.css";
import { useDispatch } from "react-redux";
import { setFiles } from "store/uploadSlice";
import getFileObj from "utils/getFileObj";
import { v4 as uuid } from "uuid";
import readAsText from "utils/readFileAsText";
import { useNavigate } from "react-router-dom";
import mediaExtensions from "utils/mediaExtensions";
import Upload from "./ui/Upload";

const UploadBtn = ({ files }) => {
    const fileRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const uploadHandler = async (event) => {
        const uploadedFiles = event.target.files;
        if (uploadedFiles.length) {
            let obj = {};
            for (const file of uploadedFiles) {
                const data = await readAsText(file);
                obj[uuid()] = getFileObj(file, data);
            }
            dispatch(setFiles({ ...files, ...obj }));
            navigate("/uploads?new");
        }
    };

    return (
        <button
            className="upload-btn align-center"
            onClick={() => fileRef.current.click()}
        >
            <input
                onChange={uploadHandler}
                ref={fileRef}
                type="file"
                multiple
                id="upload"
                accept={mediaExtensions.join(", ")}
            />
            <Upload bgColor="#fff" width={25} height={25} />
            <span>Upload Files</span>
        </button>
    );
};

export default UploadBtn;
