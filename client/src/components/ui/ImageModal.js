import React, { useEffect, useRef } from "react";
import "styles/ImageModal.css";
import closeIcon from "assets/close.svg";
import views from "assets/views.svg";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";

const ImageModal = ({ file, filesLength, setIndex, index, increaseViews }) => {
    const dialogRef = useRef();
    useEffect(() => {
        const dialog = dialogRef.current;
        dialog.addEventListener("click", (e) => {
            const dialogDimensions = dialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                dialog.close();
            }
        });
    }, []);
    return (
        <dialog ref={dialogRef} className="image-modal">
            <button
                onClick={() => dialogRef.current.close()}
                className="close-btn"
            >
                <img src={closeIcon} alt="close" width={20} height={20} />
            </button>
            <div className="modal-image-cover">
                <img src={file.content} alt={file.originalName} />
                <div className="modal-views align-center">
                    <img src={views} alt="views" width={17} height={17} />
                    <span>{file.views}</span>
                </div>
                {filesLength > 1 && (
                    <div className="modal-nav">
                        <ChevronLeft
                            width={18}
                            height={18}
                            onClick={() => {
                                if (index !== 0) {
                                    setIndex(index - 1);
                                    increaseViews(index - 1);
                                }
                            }}
                            style={{
                                opacity: index === 0 ? 0 : 1,
                                cursor: index === 0 ? "default" : "pointer",
                            }}
                        />
                        <ChevronRight
                            width={18}
                            height={18}
                            onClick={() => {
                                if (index < filesLength - 1) {
                                    setIndex(index + 1);
                                    increaseViews(index + 1);
                                }
                            }}
                            style={{
                                opacity: index === filesLength - 1 ? 0 : 1,
                                cursor:
                                    index === filesLength - 1
                                        ? "default"
                                        : "pointer",
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="modal-name">{file.originalName}</div>
        </dialog>
    );
};

export const open = () => {
    const dialog = document.getElementsByClassName("image-modal")[0];
    dialog.showModal();
};

export const close = () => {
    const dialog = document.getElementsByClassName("image-modal")[0];
    dialog.close();
};

export default ImageModal;
