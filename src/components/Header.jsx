import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full border-b-2 border-primary flex justify-between items-center p-5 sticky top-0 bg-white z-50">
            <Link to="/"><button><img src={import.meta.env.BASE_URL+"images/logo.png"} alt="" className="h-10"/></button></Link>
            <div className="flex text-primarytext items-center gap-3">
                <h1 className="font-semibold">Hi, Kanwil DKI Jakarta!</h1>
                <img src={import.meta.env.BASE_URL+"images/default-avatar.jpg"} alt="" className="rounded-full object-cover w-8 h-8"/>
                <button><RiArrowDropDownLine className="h-8 w-8"/></button>
            </div>
        </header>
    );
}