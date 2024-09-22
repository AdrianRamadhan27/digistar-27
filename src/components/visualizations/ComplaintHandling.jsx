import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, BarChart, Bar,  Legend,  LineChart, Line, XAxis, YAxis, CartesianGrid  } from 'recharts';
import  { formatDateToReadable } from "../../utils/dateFormat";
import { complaintData } from "../../data/complaintData";
import React, { useContext } from 'react';
import { DepartmentContext } from "../../context/DepartmentContext";

const categoryColors = {
    'Product Issues': "#2F80ED",
    'Service Quality': "#FFC400",
    'Other Complaint': "#EB5757",
    'Technical Support': "#35B86D",
    'Billing Issues': "#6B778C",
};
export default function ComplaintHandling() {
    const { data, addToList, deleteFromList } = useContext(DepartmentContext);

    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("The chart presents five key metrics for handling product complaints. Complaint Resolution Time and First Response Time both hold the largest shares at 30%, indicating a focus on quick responses and resolutions. Customer Satisfaction follows at 25%, showing an emphasis on customer contentment. Chat Volume per Agent accounts for 10%, and Escalation Rate is the lowest at 5%, indicating minimal need for escalations. The data highlights a balance between efficient handling and customer satisfaction.");

    const handleTextChange = (e) => {
        setDescription(e.target.value);
    };

    // Handles the button click to toggle between textarea and div
    const handleSave = () => {
        setIsEditing(false); // Stop editing and display the updated text
    };

    // Handles the edit button to turn the div into a textarea
    const handleEdit = () => {
        setIsEditing(true); // Enter edit mode (textarea)
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Calculate the date one month ago
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const oneMonthAgo = lastMonth.toISOString().split("T")[0];

    // Initialize state with one month ago for 'start' and today for 'end'
    const [startDate, setStartDate] = useState(oneMonthAgo);
    const [endDate, setEndDate] = useState(today);// Get today's date in YYYY-MM-DD format

    
    const [chartType, setChartType] = useState({
        pie: true,
        line: false, 
        bar: false, 
    });

    // Handle changes in the checkbox states
    const handleTypeChange = (typeName) => {
        setChartType({
            pie: typeName === 'pie',
            line: typeName === 'line',
            bar: typeName === 'bar',
        });
    };

    const [interval, setInterval] = useState({
        daily: true,
        weekly: false, 
        monthly: false, 
    });

    // Handle changes in the checkbox states
    const handleIntervalChange = (typeName) => {
        setInterval({
            daily: typeName === 'daily',
            weekly: typeName === 'weekly',
            monthly: typeName === 'monthly',
        });
    };

    const [metricUsed, setMetricUsed] = useState({
        category: true,
        resolution: false, 
        escalation: false, 
        abandonment: false, 
    });

    // Handle changes in the checkbox states
    const handleMetricChange = (typeName) => {
        setMetricUsed({
            category: typeName === 'category',
            resolution: typeName === 'resolution',
            escalation: typeName === 'escalation',
            abandonment: typeName === 'abandonment',
        });
    };

    const groupComplaintDataByCategory = (data) => {

        // Create an empty object to store the grouped data
        const groupedData = data.reduce((acc, current) => {
            const { category, value } = current;
            // If the category doesn't exist in the accumulator, initialize it
            if (!acc[category]) {
                acc[category] = {
                    name: category,
                    value: 0,
                    color: categoryColors[category] || '#000000', // Fallback color
                };
            }
            // Sum up the values for the category
            acc[category].value += value;
            return acc;
        }, {});
    
        // Convert the grouped object back into an array
        return Object.values(groupedData);
    };

    const groupByPeriod = (data) => {
        const groupedData = {};
        const categories = ['Product Issues', 'Service Quality', 'Other Complaint', 'Technical Support', 'Billing Issues'];
    
        data.forEach(({ category, value, date }) => {
            const dateObj = new Date(date);
            let period;
    
            if (interval.monthly) {
                period = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
            } else if (interval.weekly) {
                const weekNumber = Math.ceil((dateObj.getDate() + (dateObj.getDay() || 7)) / 7); // Calculate week number in the month
                const month = dateObj.toLocaleString('default', { month: 'short' });
                period = `W${weekNumber} ${month} ${dateObj.getFullYear().toString().slice(-2)}`;
            } else { // Default to daily grouping
                period = dateObj.toLocaleString('default', { day: '2-digit', month: 'short', year: '2-digit' });
            }
            if (!groupedData[period]) {
                groupedData[period] = { name: period };
                // Initialize all categories to 0
                categories.forEach(cat => {
                    groupedData[period][cat] = 0;
                });
            }
            groupedData[period][category] += value; // Accumulate the value
        });
    
        // Ensure all months have all categories initialized
        Object.keys(groupedData).forEach(month => {
            categories.forEach(cat => {
                if (!(cat in groupedData[month])) {
                    groupedData[month][cat] = 0; // Default to 0 if no entries
                }
            });
        });
    
        return Object.values(groupedData);
    }
    
    const filteredData = complaintData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });

    const convertPieData = () => {
        
        return groupComplaintDataByCategory(filteredData);
    }

      // Filter complaint data based on the selected date range
    const pieData = convertPieData()

    const convertPeriodicData = () => {
        
        return groupByPeriod(filteredData);
    }

      // Filter complaint data based on the selected date range
    const periodicData = convertPeriodicData()



    return (
        <div className="p-10 mt-5 border-b-2 border-b-primary">
            <h2 className="font-bold text-xl">Chat Complaint Handling</h2>

            <div className={`grid ${chartType.pie ? "grid-cols-4": "grid-cols-5"} max-w-5xl mt-4`}>
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-md">Chart</h3>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="pie" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={chartType.pie} onClick={() => handleTypeChange('pie')}/>
                        <label htmlFor="pie" className="text-sm text-primarytext">Pie chart</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="line" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={chartType.line} onClick={() => handleTypeChange('line')}/>
                        <label htmlFor="line" className="text-sm text-primarytext">Line chart</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="bar" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={chartType.bar} onClick={() => handleTypeChange('bar')}/>
                        <label htmlFor="bar" className="text-sm text-primarytext">Bar chart</label>
                    </div>
                </div>
                {!chartType.pie && <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-md">Interval</h3>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="pie" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={interval.daily} onClick={() => handleIntervalChange('daily')}/>
                        <label htmlFor="pie" className="text-sm text-primarytext">Daily</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="line" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={interval.weekly} onClick={() => handleIntervalChange('weekly')}/>
                        <label htmlFor="line" className="text-sm text-primarytext">Weekly</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="bar" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={interval.monthly} onClick={() => handleIntervalChange('monthly')}/>
                        <label htmlFor="bar" className="text-sm text-primarytext">Monthly</label>
                    </div>
                </div>}
                
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
                        <input type="checkbox" name="" id="department" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked/>
                        <label htmlFor="department" className="text-sm text-primarytext">Kanwil DKI Jakarta</label>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-md">Sub Department</h3>
                    <div className="grid grid-cols-2 gap-2">
                    {data.map(item => (
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="" id={"subdepartment"+item} className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset"/>
                            <label htmlFor={"subdepartment"+item}  className="text-xs text-primarytext truncate">{item}</label>
                        </div>
                    ))}
                    </div>
                </div>
                

            </div>
            <div className="flex flex-col gap-3  my-5">
                <h3 className="font-bold text-md">Metrics</h3>
                <div className="grid grid-cols-2 grid-rows-2 gap-5">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="category" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.category} onClick={() => handleMetricChange('category')}/>
                        <label htmlFor="category" className="text-sm text-primarytext">Complaint category</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="escalation" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.escalation} onClick={() => handleMetricChange('escalation')}/>
                        <label htmlFor="escalation" className="text-sm text-primarytext">Escalation rate</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="firstcontact" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.resolution} onClick={() => handleMetricChange('resolution')}/>
                        <label htmlFor="firstcontact" className="text-sm text-primarytext">First contact resolution</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="abandonment" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.abandonment} onClick={() => handleMetricChange('abandonment')}/>
                        <label htmlFor="abandonment" className="text-sm text-primarytext">Chat abandonment rate</label>
                    </div>
                </div>
            </div>
            
            
            <h3 className="my-5">Result</h3>
            
            <div className="text-center align-center mt-5">
                <h2 className="font-extrabold text-xl">Chat Complaint Handling Chart</h2>
                <p className="text-xs">{formatDateToReadable(startDate)} - {formatDateToReadable(endDate)}</p>
                <ResponsiveContainer width="100%" height={400}>
                    { filteredData.length === 0 ? (
                            <h2 className="text-accent font-bold text-xl my-10">There are no data within the date range</h2>
                        )
                        : (
                            (() => {
                                if (chartType.pie) {
                                    return (
                                        <PieChart width="100%" height={400}>
                                            <Pie
                                                dataKey="value"
                                                isAnimationActive={true}
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                                label
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    );
                                } else if (chartType.line) {
                                    // Replace with your LineChart component
                                    return (
                                        <LineChart
                                        width="100%"
                                        height={400}
                                        data={periodicData}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {Object.entries(categoryColors).map(([category, color]) => (
                                            <Line type="" dataKey={category} stroke={color} />
                                        ))}
                                
                                      </LineChart>
                                    );
                                } else if (chartType.bar) {
                                    // Replace with your BarChart component
                                    return (
                                        <BarChart width="100%" height={400} data={periodicData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            {Object.entries(categoryColors).map(([category, color]) => (
                                                 <Bar dataKey={category} stackId="a" fill={color} />
                                            ))}

                                

                                        </BarChart>
                                    );
                                }
                                return null; // Fallback if none are selected
                            })()
                        )}
                </ResponsiveContainer>
            
            </div>

            <h3 className="my-3">Description</h3>

            <div className="text-sm">
                {isEditing ? (
                    <textarea
                        value={description}
                        onChange={handleTextChange}
                        className="border-2 border-accent rounded-md p-3 w-full min-h-32"
                    />
                ) : (
                    <div className="p-3 rounded-md bg-[#F0F0F0] font-light">{description}</div>
                )}
                <div className="text-right">
                    <button onClick={isEditing ? handleSave : handleEdit} className="mt-4 py-2 px-6 rounded-full bg-accent hover:bg-accent-hover text-white">
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </div>

            </div>

        </div>
    );
}