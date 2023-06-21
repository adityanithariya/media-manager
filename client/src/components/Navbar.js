import React from "react";
import "styles/Navbar.css";
import Uploads from "./ui/Uploads";
import Gallary from "./ui/Gallary";
import HomeIcon from "./ui/HomeIcon";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const width = 22,
        height = 22;
    const pathname = useLocation().pathname;
    return (
        <nav className="navbar align-center">
            <Link
                to="/"
                className={`navLink${pathname === "/" ? " active" : ""}`}
            >
                <HomeIcon bgColor="#fff" width={width} height={height} />
            </Link>
            <Link
                to="/uploads"
                className={`navLink${pathname === "/uploads" ? " active" : ""}`}
            >
                <Uploads bgColor="#fff" width={width} height={height} />
            </Link>
            <Link
                to="/gallary"
                className={`navLink${pathname === "/gallary" ? " active" : ""}`}
            >
                <Gallary bgColor="#fff" width={width} height={height} />
            </Link>
        </nav>
    );
};

export default Navbar;
