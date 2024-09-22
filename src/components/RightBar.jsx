import { GoPeople, GoPerson, GoPersonAdd } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import React, { useContext, useState } from 'react';
import { DepartmentContext } from "../context/DepartmentContext";
export default function RightBar({expanded, setExpanded}) {
    const { data, addToList, deleteFromList } = useContext(DepartmentContext);
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState();

    const handleTextChange = (e) => {
        setName(e.target.value);
    };

    // Handles the button click to toggle between textarea and div
    const handleSave = () => {
        addToList(name)
        setIsAdding(false);
    };

    // Handles the edit button to turn the div into a textarea
    const handleAdd = () => {
        setIsAdding(true); // Enter edit mode (textarea)
    };
    return (
        <aside className="h-screen fixed right-0">
            <div 
                className={`h-full flex flex-col border-l-2 border-l-primary overflow-y-auto ${
                    expanded ? "w-64 bg-white" : "w-14 bg-secondary shadow-lg"
                  }`}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >
                <div className="border-b-2 border-b-primary flex flex-col p-5 gap-2 pt-8">
                    {expanded && 
                        <h2 className="font-bold text-primarytext text-sm">Parent Department</h2>
                    }

                    {
                        expanded
                        ? <div className="rounded-sm border-2 border-gray-200 flex gap-2 items-center p-2 text-gray-500 text-xs"><GoPeople /> Kanwil DKI Jakarta</div>
                        : <GoPeople className="m-auto"/>
                    }
                </div>

                <div className="flex flex-col p-5 pt-8">
                    {expanded && 
                        <h2 className="font-bold text-primarytext text-sm mb-2">Sub Department</h2>
                    }

                    {data.map((item, index) => (
                        expanded
                        ? <div className="my-1 rounded-sm border-2 border-gray-200 flex gap-2 items-center p-2 justify-between">
                                <div className="flex gap-2 items-center"><GoPerson /><p className="truncate w-36 text-xs">{item}</p></div>
                                <button onClick={() => {deleteFromList(index)}} className="text-accent hover:text-accent-hover"><LuTrash2 /></button>
                            </div>
                        : <GoPerson className="my-4 m-auto"/>
                    ))}

                    {isAdding && (
                    <input
                        type="text"
                        value={name}
                        onChange={handleTextChange}
                        className="border-2 border-accent rounded-md p-2 text-xs my-1"
                    />
                    ) }
                    
                    {expanded && 
                        <button onClick={isAdding ? handleSave : handleAdd} className="my-2 flex items-center bg-accent hover:bg-accent-hover text-white text-xs p-2 justify-center gap-1 rounded-md"><GoPersonAdd />{isAdding ? "Save" : "Add"}</button>
                    }  
                    
                </div>

                
            </div>
        </aside>

    );
}