import { useDispatch, useSelector } from "react-redux";
import { setFiles } from "store/uploadSlice";
import getFileObj from "utils/getFileObj";
import mediaExtensions from "utils/mediaExtensions";
import { v4 as uuid } from "uuid";

const useDragUpload = () => {
    const { files } = useSelector((state) => state.files);
    const dispatch = useDispatch();

    const dropHandler = (e) => {
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length && FileReader) {
            for (const file of droppedFiles) {
                if (
                    !mediaExtensions.includes(
                        `.${file.name.split(".").slice(-1)[0]}`
                    )
                )
                    continue;
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
    return [files, dropHandler];
};

export default useDragUpload;
