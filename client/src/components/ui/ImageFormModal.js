import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "styles/ImageFormModal.css";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";
import Dot from "./Dot";
import { setFiles } from "store/uploadSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImageFormModal = () => {
    const { files } = useSelector((state) => state.files);
    const [index, setIndex] = useState(0);
    const file = files[Object.keys(files)[index]];
    const dispatch = useDispatch();
    const dialog = useRef();
    const navigate = useNavigate();
    const submitMedia = () => {
        dialog.current.close();
        for (const id in files) {
            let media = files[id];
            console.log("Bearer " + localStorage.getItem("accessToken"));
            const res = axios({
                method: "post",
                url: process.env.REACT_APP_SERVER_URL + "/media/create",
                data: media,
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    dispatch(
                        setFiles({ ...files, [id]: { ...media, progress } })
                    );
                },
            });
            console.log(res);
        }
        navigate("/uploads");
    };

    return (
        <dialog ref={dialog} className="form-modal">
            {Object.keys(files).length ? (
                <div className="form-box align-center">
                    <div className="inputWrapper">
                        <div>
                            <img
                                src={file.content}
                                alt={file.name}
                                width={180}
                            />
                        </div>
                        <div className="align-center headerContent">
                            <div className="file-name">{file.originalName}</div>
                        </div>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="name">&nbsp;Name&nbsp;</label>
                        <input
                            placeholder=" "
                            autoComplete="off"
                            type="text"
                            id="name"
                            value={file.name}
                            onChange={(e) => {
                                let obj = {
                                    ...files,
                                };
                                obj[Object.keys(files)[index]] = {
                                    ...file,
                                    name: e.target.value,
                                };
                                dispatch(setFiles(obj));
                            }}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="desc">&nbsp;Description&nbsp;</label>
                        <textarea
                            value={file.desc}
                            onChange={(e) => {
                                let obj = {
                                    ...files,
                                };
                                obj[Object.keys(files)[index]] = {
                                    ...file,
                                    desc: e.target.value,
                                };
                                dispatch(setFiles(obj));
                            }}
                            placeholder=" "
                            id="desc"
                        />
                    </div>
                    <div className="modal-nav align-center">
                        {Object.keys(files).length > 1 && (
                            <>
                                <button
                                    className="left"
                                    onClick={() => {
                                        if (index !== 0) setIndex(index - 1);
                                    }}
                                >
                                    <ChevronLeft width={18} height={18} />
                                </button>
                                {Object.keys(files).map((e, i) => (
                                    <Dot
                                        key={i}
                                        index={i}
                                        currentIndex={index}
                                        setIndex={setIndex}
                                    />
                                ))}
                                <button
                                    className="right"
                                    onClick={() => {
                                        if (
                                            index <
                                            Object.keys(files).length - 1
                                        )
                                            setIndex(index + 1);
                                    }}
                                >
                                    <ChevronRight width={18} height={18} />
                                </button>
                            </>
                        )}
                    </div>
                    {index === Object.keys(files).length - 1 && (
                        <button className="submit" onClick={submitMedia}>
                            Submit
                        </button>
                    )}
                </div>
            ) : (
                ""
            )}
        </dialog>
    );
};

export const open = () => {
    const dialog = document.getElementsByClassName("form-modal")[0];
    dialog.showModal();
};

export const close = () => {
    const dialog = document.getElementsByClassName("form-modal")[0];
    dialog.close();
};

export default ImageFormModal;
