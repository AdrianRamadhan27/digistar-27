import React from "react";


export default function EmptyPage({title}) {
    return (

            <div className="w-full p-5">
                <div className="bg-gradient-to-r from-white via-pink-400/50 to-accent/50 bg-opacity-50 flex justify-between rounded-md w-full p-5 h-40">
                    <div className="flex flex-col text-left gap-3">
                        <img src={import.meta.env.BASE_URL+"/images/logo.png"} alt="" className="w-32"/>
                        <div className="w-fit rounded-full p-1 text-white bg-accent text-xs font-semibold">OCA Interaction</div>
                        <h1 className="text-accent font-extrabold text-3xl">{title}</h1>
                    </div>
                </div>
            </div>
    );
}