import React, { useRef } from "react";
import "styles/DragUpload.css";
import useDragUpload from "hooks/useDragUpload";
import UploadBtn from "./UploadBtn";

const DragUpload = () => {
    const dragBox = useRef();
    const [files, dropHandler] = useDragUpload();

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
                </div>
                <div id="or">or</div>
                <UploadBtn files={files} />
            </div>
        </main>
    );
};

export default DragUpload;
