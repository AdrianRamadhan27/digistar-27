import React from "react";


export default function Dashboard() {
    return (
        <div className="w-full">
            <div className="text-right px-5">
                <button className="text-white bg-accent hover:bg-accent-hover rounded-b-md p-2 text-sm font-semibold">Export to PDF</button>
            </div>
            <div className="p-5 mt-5">
                <div className="bg-gradient-to-r from-white via-pink-600/75 to-accent/75 bg-opacity-50 flex justify-between rounded-md w-full p-5 h-40">
                    <div className="flex flex-col text-left gap-3">
                        <img src={import.meta.env.BASE_URL+"/images/logo.png"} alt="" className="w-32"/>
                        <div className="w-fit rounded-full p-1 text-white bg-accent text-xs font-semibold">OCA Interaction</div>
                        <h1 className="text-accent font-extrabold text-2xl">Data Visualization Dashboard</h1>
                    </div>
                    <img src={import.meta.env.BASE_URL+"/images/cover.png"} alt=""/>
                </div>
            </div>
            
        </div>
    );
}