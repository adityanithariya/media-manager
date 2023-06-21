import React, { useEffect, useRef, useState } from "react";
import "styles/UploadedFiles.css";
import moment from "moment";
// import deleteIcon from "assets/delete.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { setFiles } from "store/uploadSlice";

const UploadCard = ({ file, id }) => {
    const [progress, setProgress] = useState(0);
    // const dispatch = useDispatch();
    // const { files } = useSelector((state) => state.files);
    useEffect(() => {
        progressBar.current.style.setProperty("--width", progress);
    }, [progress]);
    const progressBar = useRef();
    return (
        <div className="uploadCard align-center">
            <div className="align-center">
                <img src={file.content} alt={file.name} width={180} />
            </div>
            <div className="align-center uploadContent">
                <div className="align-center">
                    <div>
                        {file.name === "" ? file.originalName : file.name}
                    </div>
                    <div>{moment(file.uploadedAt).fromNow()}</div>
                </div>
                <div ref={progressBar} className="progress-bar"></div>
                {/* <img
                    className="delete-icon"
                    src={deleteIcon}
                    alt="delete"
                    width={18}
                    height={18}
                    onClick={() => {
                        let obj = JSON.parse(JSON.stringify(files));
                        delete obj[id];
                        dispatch(setFiles(obj));
                    }}
                /> */}
            </div>
        </div>
    );
};

export default UploadCard;
