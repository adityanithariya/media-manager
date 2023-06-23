import DragUpload from "components/DragUpload";
import "./App.css";
import UploadedFiles from "components/UploadedFiles";
import Navbar from "components/Navbar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Gallary from "components/Gallary";
import Register from "components/Register";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Register />} />
                    <Route exact path="/" element={<DragUpload />} />
                    <Route exact path="/uploads" element={<UploadedFiles />} />
                    <Route exact path="/gallary" element={<Gallary />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
