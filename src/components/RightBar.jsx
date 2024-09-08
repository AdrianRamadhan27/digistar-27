import { GoPeople, GoPerson, GoPersonAdd } from "react-icons/go";
import { departmentItems } from "../data/departmentsItems";
import { LuTrash2 } from "react-icons/lu";

export default function RightBar({expanded, setExpanded}) {
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
                        <h2 className="font-bold text-primarytext text-sm">Sub Department</h2>
                    }

                    {departmentItems.map(item => (
                        expanded
                        ? <div className="my-2 rounded-sm border-2 border-gray-200 flex gap-2 items-center p-2 justify-between">
                                <div className="flex gap-2 items-center"><GoPerson /><p className="truncate w-36 text-xs">{item}</p></div>
                                <button className="text-accent hover:text-accent-hover"><LuTrash2 /></button>
                            </div>
                        : <GoPerson className="my-4 m-auto"/>
                    ))}
                    
                    {expanded && 
                        <button className="my-2 flex items-center bg-accent hover:bg-accent-hover text-white text-xs p-2 justify-center gap-1"><GoPersonAdd />Add</button>
                    }  
                    
                </div>

                
            </div>
        </aside>

    );
}