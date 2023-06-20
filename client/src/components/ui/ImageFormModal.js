import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "styles/ImageFormModal.css";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";
import Dot from "./Dot";

const ImageFormModal = () => {
    const dialogRef = useRef();
    const { files } = useSelector((state) => state.files);
    const [index, setIndex] = useState(0);
    const file = files[Object.keys(files)[index]];
    useEffect(() => {
        dialogRef.current.show();
    }, []);
    return (
        <dialog ref={dialogRef} className="form-modal">
            {Object.keys(files).length ? (
                <div className="form-box align-center">
                    <div className="inputWrapper">
                        <img
                            src={`data:image;base64,${file.content}`}
                            alt={file.name}
                            width={180}
                        />
                        <div className="align-center headerContent">
                            <div>{file.originalName}</div>
                            <div>{moment(file.uploadedAt).fromNow()}</div>
                        </div>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="name">&nbsp;Name&nbsp;</label>
                        <input placeholder=" " type="text" id="name" />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="desc">&nbsp;Description&nbsp;</label>
                        <textarea placeholder=" " id="desc" />
                    </div>
                    <div className="modal-nav align-center">
                        <ChevronLeft width={20} height={20} />
                        <Dot />
                        <ChevronRight width={20} height={20} />
                    </div>
                </div>
            ) : (
                ""
            )}
        </dialog>
    );
};

export default ImageFormModal;
