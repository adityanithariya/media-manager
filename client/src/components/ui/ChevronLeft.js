import React from "react";

const ChevronLeft = ({ width, height, onClick, style }) => {
    return (
        <svg
            width={width}
            height={height}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#000"
            className="w-6 h-6"
            style={{
                cursor: "pointer",
                ...style
            }}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    );
};

export default ChevronLeft;
