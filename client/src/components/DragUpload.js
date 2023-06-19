import React, { useRef } from "react";
import "styles/DragUpload.css";
import upload from "assets/upload.svg";

const DragUpload = () => {
    const fileRef = useRef();
    const dragBox = useRef();

    const dropHandler = (e) => {};

    return (
        <main className="upload-main align-center">
            <div className="align-center">
                <div
                    onDrop={dropHandler}
                    onDragOver={(e) => {}}
                    onDragLeave={(e) => {
                        e.target.classList.remove("drag-over");
                    }}
                    onDragEnter={(e) => {
                        e.target.classList.add("drag-over");
                    }}
                    ref={dragBox}
                    className="drag-box align-center"
                >
                    <div id="drag-in">Release to upload!</div>
                    <div id="normal">Drag & Drop Files Here!</div>
                    <input
                        ref={fileRef}
                        type="file"
                        multiple
                        id="upload"
                        accept=".jpg, .jpeg, .png, .gif, .svg, .mp4, .mp3"
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
