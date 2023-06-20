import DragUpload from "components/DragUpload";
import "./App.css";
import UploadedFiles from "components/UploadedFiles";
import ImageFormModal from "components/ui/ImageFormModal";

function App() {
    return (
        <div className="App">
            <DragUpload />
            <UploadedFiles />
            <ImageFormModal />
        </div>
    );
}

export default App;
