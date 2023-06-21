import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "styles/Gallary.css";
import ImageModal, { open } from "./ui/ImageModal";
import { setFiles } from "store/uploadSlice";

const Gallary = () => {
    const { files } = useSelector((state) => state.files);
    const [index, setIndex] = useState(0);
    const [selectedFile, setSelectedFile] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        if (Object.keys(files).length)
            setSelectedFile(files[Object.keys(files)[index]]);
    }, [index, files]);
    const increaseViews = (index) => {
        const key = Object.keys(files)[index];
        let obj = {
            ...files,
        };
        obj[key] = {
            ...files[key],
            views: files[key].views + 1,
        };
        console.log(files[key].originalName);
        dispatch(setFiles(obj));
    };
    return (
        <main className="gallary-main">
            <h3>Gallary</h3>
            <div className="gallary-content align-center">
                {Object.keys(files).map((key, i) => {
                    return (
                        <div
                            className="content-box align-center"
                            key={key}
                            onClick={() => {
                                let obj = {
                                    ...files,
                                };
                                obj[key] = {
                                    ...files[key],
                                    views: files[key].views + 1,
                                };
                                dispatch(setFiles(obj));
                                setIndex(i);
                                setSelectedFile(files[key]);
                                open();
                            }}
                        >
                            <div className="content-img">
                                <img
                                    className={key}
                                    src={files[key].content}
                                    height={170}
                                    alt={files[key].originalName}
                                />
                            </div>
                            <div className="content-title">
                                {files[key].name === ""
                                    ? files[key].originalName
                                    : files.name}
                            </div>
                        </div>
                    );
                })}
            </div>
            <ImageModal
                file={selectedFile}
                filesLength={Object.keys(files).length}
                setIndex={setIndex}
                index={index}
                increaseViews={increaseViews}
            />
        </main>
    );
};

export default Gallary;
