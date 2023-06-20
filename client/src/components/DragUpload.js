import React, { useEffect, useRef } from "react";
import "styles/DragUpload.css";
import upload from "assets/upload.svg";
import useDragUpload from "hooks/useDragUpload";
import { useDispatch } from "react-redux";
import { setFiles } from "store/uploadSlice";
import getFileObj from "utils/getFileObj";
import mediaExtensions from "utils/mediaExtensions";
import { v4 as uuid } from "uuid";

const DragUpload = () => {
    const fileRef = useRef();
    const dragBox = useRef();
    const [files, dropHandler] = useDragUpload();
    const dispatch = useDispatch();

    const uploadHandler = (event) => {
        const uploadedFiles = event.target.files;
        if (uploadedFiles.length) {
            for (const file of uploadedFiles) {
                const reader = new FileReader();
                reader.onload = () => {
                    let obj = {};
                    obj[uuid()] = getFileObj(file, reader.result);
                    dispatch(setFiles({ ...files, ...obj }));
                };
                reader.readAsArrayBuffer(file);
            }
        }
    };

    useEffect(() => {
        console.log(files);
    }, [files]);

    return (
        <main className="upload-main align-center">
            <div className="align-center">
                <div
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.target.classList.remove("drag-over");
                        dropHandler(e);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onDragEnter={(e) => {
                        e.target.classList.add("drag-over");
                    }}
                    onDragLeave={(e) => {
                        e.target.classList.remove("drag-over");
                    }}
                    ref={dragBox}
                    className="drag-box align-center"
                >
                    <div id="drag-in">Release to upload!</div>
                    <div id="normal">Drag & Drop Files Here!</div>
                    <input
                        onChange={uploadHandler}
                        ref={fileRef}
                        type="file"
                        multiple
                        id="upload"
                        accept={mediaExtensions.join(", ")}
                    />
                </div>
                <div id="or">or</div>
            </div>
            <button
                className="upload-btn align-center"
                onClick={() => fileRef.current.click()}
            >
                <img src={upload} width={20} height={20} alt="upload" />
                <span>Upload Files</span>
            </button>
        </main>
    );
};

export default DragUpload;
