import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFiles } from "store/uploadSlice";
import getFileObj from "utils/getFileObj";
import mediaExtensions from "utils/mediaExtensions";
import readAsText from "utils/readFileAsText";
import { v4 as uuid } from "uuid";

const useDragUpload = () => {
    const { files } = useSelector((state) => state.files);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dropHandler = async (e) => {
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length && FileReader) {
            let obj = {};
            for (const file of droppedFiles) {
                if (
                    !mediaExtensions.includes(
                        `.${file.name.split(".").slice(-1)[0]}`
                    )
                )
                    continue;
                const data = await readAsText(file);
                obj[uuid()] = getFileObj(file, data);
            }
            dispatch(setFiles({ ...files, ...obj }));
            navigate("/uploads?new");
        }
    };
    return [files, dropHandler];
};

export default useDragUpload;
