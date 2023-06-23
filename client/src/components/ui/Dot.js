import React from "react";

const Dot = ({ index, currentIndex, setIndex }) => {
    return index === currentIndex ? (
        <div className={`dot${index === currentIndex ? " active" : ""}`}></div>
    ) : (
        <button
            className={`dot${index === currentIndex ? " active" : ""}`}
            onClick={(e) => setIndex(index)}
        ></button>
    );
};

export default Dot;
