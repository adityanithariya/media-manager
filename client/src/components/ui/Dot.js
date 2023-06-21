import React from "react";

const Dot = ({ index, currentIndex, setIndex }) => {
    return (
        <div
            className={`dot${index === currentIndex ? " active" : ""}`}
            onClick={(e) => setIndex(index)}
        ></div>
    );
};

export default Dot;
