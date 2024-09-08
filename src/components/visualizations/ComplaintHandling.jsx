import { departmentItems } from "../../data/departmentsItems";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

export default function ComplaintHandling() {

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Calculate the date one month ago
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const oneMonthAgo = lastMonth.toISOString().split("T")[0];

    // Initialize state with one month ago for 'start' and today for 'end'
    const [startDate, setStartDate] = useState(oneMonthAgo);
    const [endDate, setEndDate] = useState(today);// Get today's date in YYYY-MM-DD format

    return (
        <div className="p-10 mt-5 border-b-2 border-b-primary">
            <h2 className="font-bold text-xl">Chat Complaint Handling</h2>

            <div className="grid grid-cols-4 max-w-5xl mt-4">
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-md">Chart</h3>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="pie" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="pie" className="text-sm text-primarytext">Pie chart</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="line" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="line" className="text-sm text-primarytext">Line chart</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="bar" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="bar" className="text-sm text-primarytext">Bar chart</label>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-md">Date</h3>
                    <div className="flex max-w-44 justify-between items-center">
                        <label htmlFor="start">Start</label>
                        <input type="date" name="" id="start" value={startDate} onChange={(e) => setStartDate(e.target.value)}  className="text-xs border-2 border-primary rounded-md"/>
                    </div>
                    <FaArrowDown />
                    <div className="flex max-w-44 justify-between items-center">
                        <label htmlFor="end">End</label>
                        <input type="date" name="" id="end" value={endDate} onChange={(e) => setEndDate(e.target.value)}  className="text-xs border-2 border-primary rounded-md"/>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-md">Department</h3>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="department" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="department" className="text-sm text-primarytext">Kanwil DKI Jakarta</label>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-md">Sub Department</h3>
                    {departmentItems.map(item => (
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="" id={"subdepartment"+item} className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                            <label htmlFor={"subdepartment"+item}  className="text-sm text-primarytext">{item}</label>
                        </div>
                    ))}
                </div>
                

            </div>
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-md">Metrics</h3>
                <div className="grid grid-cols-2 grid-rows-2 gap-5">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="category" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="category" className="text-sm text-primarytext">Complaint category</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="escalation" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="escalation" className="text-sm text-primarytext">Escalation rate</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="firstcontact" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="firstcontact" className="text-sm text-primarytext">First contact resolution</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="abandonment" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                        <label htmlFor="abandonment" className="text-sm text-primarytext">Chat abandonment rate</label>
                    </div>
                </div>
            </div>
        </div>
    );
}