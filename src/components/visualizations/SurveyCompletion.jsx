import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, BarChart, Bar,  Legend,  LineChart, Line, XAxis, YAxis, CartesianGrid  } from 'recharts';
import  { formatDateToReadable } from "../../utils/dateFormat";
import React, { useContext } from 'react';
import { DepartmentContext } from "../../context/DepartmentContext";
import { surveyData } from "../../data/surveyData";
const categoryColors = {
    'Customer Satisfaction Survey': '#F0F0F0',
    'Feature Feedback Survey': '#FF5733',
    'Marketing Strategy Survey': '#33FF57',
    'Product Preference Survey': '#5733FF',
    'Research Survey': '#FFC300',
    'Implementation Survey': '#DAF7A6',
    'Customer Loyalty Survey': '#FF33F6',
    'Product Feedback Survey': '#FF3385',
    'Event Feedback Survey': '#3385FF',
    'Employee Satisfaction Survey': '#85FF33',
    'Market Research Survey': '#FF8C00',
    'Service Quality Survey': '#33FFF6',
    'User Experience Survey': '#C70039',
    'New Product Survey': '#581845',
};



export default function SurveyCompletion() {
    const { data, addToList, deleteFromList } = useContext(DepartmentContext);

    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("The table illustrates the completion rates of various surveys, ranging from customer satisfaction to technology adoption. The highest completion rate is observed in the Service Quality Survey at 85%, indicating strong engagement with this type of survey. The New Product Survey follows closely with an 83.33% completion rate, reflecting high interest in product-related feedback. Meanwhile, the Event Feedback Survey has the lowest completion rate at 66.67%, suggesting potential challenges in gathering responses after events.Most of the surveys, including Customer Satisfaction, Product Preference, and Market Research, show a consistent completion rate of 80%. This suggests a stable level of participation across these topics. The Technology Adoption Survey, added at the bottom, also shows a relatively strong completion rate of 79.41%, reflecting users' engagement with technological changes. Overall, the table reveals a balanced distribution of survey completion, with only minor variations, except for the lower performance of event-related feedback.");

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
        pie: false,
        line: false, 
        bar: false, 
        table: true, 
    });

    // Handle changes in the checkbox states
    const handleTypeChange = (typeName) => {
        setChartType({
            pie: typeName === 'pie',
            line: typeName === 'line',
            bar: typeName === 'bar',
            table: typeName === 'table',
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
        name: true,
        started: true, 
        completed: true, 
        rate: true, 
    });

    // Handle changes in the checkbox states
    const handleMetricChange = (typeName) => {
        setMetricUsed((prevState) => ({
            ...prevState,
            [typeName]: !prevState[typeName],
          }));
    };

    const groupDataByCategory = (data) => {

        // Create an empty object to store the grouped data
        const groupedData = data.reduce((acc, current) => {
            const { category, started, completed } = current;
            // If the category doesn't exist in the accumulator, initialize it
            if (!acc[category]) {
                acc[category] = {
                    name: category,
                    started: 0,
                    completed: 0,
                    color: categoryColors[category] || '#000000', // Fallback color
                };
            }
            // Sum up the starteds for the category
            acc[category].started += started;
            acc[category].completed += completed;
            return acc;
        }, {});
    
        // Convert the grouped object back into an array
        return Object.values(groupedData);
    };

    const groupByPeriod = (data) => {
        const groupedData = {};
        const categories = ['Customer Satisfaction Survey',
    'Feature Feedback Survey',
    'Marketing Strategy Survey',
    'Product Preference Survey',
    'Research Survey',
    'Implementation Survey',
    'Customer Loyalty Survey',
    'Product Feedback Survey',
    'Event Feedback Survey',
    'Employee Satisfaction Survey',
    'Market Research Survey',
    'Service Quality Survey',
    'User Experience Survey',
    'New Product Survey',];
    
        data.forEach(({ category, started, completed,  date }) => {
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
            groupedData[period][category] += started; // Accumulate the value
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

    const filteredData = surveyData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    


    const convertPieData = () => {
        
        return groupDataByCategory(filteredData);
    }

      // Filter complaint data based on the selected date range
    const pieData = convertPieData()

    const convertPeriodicData = () => {
        
        return groupByPeriod(filteredData);
    }

      // Filter complaint data based on the selected date range
    const periodicData = convertPeriodicData()

    
    const groupForTable = (data) => {
        const groupedData = {};
    
        data.forEach(({ category, started, completed }) => {
            // Check if the category already exists in the groupedData
            if (!groupedData[category]) {
                groupedData[category] = { started: 0, completed: 0 };
            }
            // Add the started and completed values to the existing category entry
            groupedData[category].started += started;
            groupedData[category].completed += completed;
        });
    
        // Convert grouped data from object to array format
        return Object.keys(groupedData).map(category => ({
            category,
            started: groupedData[category].started,
            completed: groupedData[category].completed,
            color: categoryColors[category], // Include the color mapping
        }));
    };

    const covertTableData = () => {
        
        return groupForTable(filteredData);
    }

    const tableData = covertTableData()

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;

    // Calculate the current rows
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    // Total pages
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    // Change page
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };




    return (
        <div className="p-10 mt-5 border-b-2 border-b-primary">
            <h2 className="font-bold text-xl">Survey Completion Rate</h2>

            <div className={`grid ${(chartType.line || chartType.bar) ? "grid-cols-5": "grid-cols-4"} max-w-5xl mt-4`}>
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
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="table" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={chartType.table} onClick={() => handleTypeChange('table')}/>
                        <label htmlFor="table" className="text-sm text-primarytext">Table</label>
                    </div>
                </div>
                {(chartType.line || chartType.bar) && <div className="flex flex-col gap-3">
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
                        <input type="checkbox" name="" id="category" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.name} onClick={() => handleMetricChange('name')}/>
                        <label htmlFor="category" className="text-sm text-primarytext">Survey Name</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="escalation" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.started} onClick={() => handleMetricChange('started')}/>
                        <label htmlFor="escalation" className="text-sm text-primarytext">Number Started</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="firstcontact" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.completed} onClick={() => handleMetricChange('completed')}/>
                        <label htmlFor="firstcontact" className="text-sm text-primarytext">Number Completed</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="abandonment" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={metricUsed.rate} onClick={() => handleMetricChange('rate')}/>
                        <label htmlFor="abandonment" className="text-sm text-primarytext">Completion Rate (%)</label>
                    </div>
                </div>
            </div>
            
            
            <h3 className="my-5">Result</h3>
            
            <div className="text-center align-center mt-5">
                <h2 className="font-extrabold text-xl">Survey Completion Rate Chart</h2>
                <p className="text-xs">{formatDateToReadable(startDate)} - {formatDateToReadable(endDate)}</p>
                    { filteredData.length === 0 ? (
                            <h2 className="text-accent font-bold text-xl my-10">There are no data within the date range</h2>
                        )
                        : (
                            (() => {
                                if (chartType.pie) {
                                    return (
                                        <ResponsiveContainer width="100%" height={400}>
                                        <PieChart width="100%" height={400}>
                                            <Pie
                                                dataKey="started"
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
                                        </ResponsiveContainer>

                                    );
                                } else if (chartType.line) {
                                    // Replace with your LineChart component
                                    return (
                                        <ResponsiveContainer width="100%" height={400}>
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
                                        </ResponsiveContainer>

                                    );
                                } else if (chartType.bar) {
                                    // Replace with your BarChart component
                                    return (
                                        <ResponsiveContainer width="100%" height={400}>
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
                                        </ResponsiveContainer>
                                        
                                    );
                                } else if (chartType.table) {
                                    return (
                                        <div className="my-5">
                                        <table className="border-2 border-primary rounded-md m-auto text-sm">
                                            <thead className="bg-accent text-white">
                                                <tr>
                                                    {metricUsed.name && <th className="font-normal p-3">Survey Name</th>}
                                                    {metricUsed.started && <th className="font-normal p-3 border-l-2 border-l-primary">Number Started</th>}
                                                    {metricUsed.completed && <th className="font-normal p-3 border-l-2 border-l-primary">Number Completed</th>}
                                                    {metricUsed.rate && <th className="font-normal p-3 border-l-2 border-l-primary">Completion Rate (%)</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentRows.map(({ category, started, completed }, index) => (
                                                    <tr key={index} className="border-t-2 border-t-primary">
                                                        {metricUsed.name && <td className="p-3 text-left">{category}</td>}
                                                        {metricUsed.started && <td className="p-3 text-center border-l-2 border-l-primary">{started}</td>}
                                                        {metricUsed.completed && <td className="p-3 text-center border-l-2 border-l-primary">{completed}</td>}
                                                        {metricUsed.rate && <td className="p-3 text-center border-l-2 border-l-primary">{((completed / started) * 100).toFixed(2)}%</td>}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-center my-3">
                                            Showing {indexOfFirstRow+1} to {Math.min(indexOfLastRow, tableData.length)} of {tableData.length}
                                        </p>
                                        {/* Pagination */}
                                        <div className="text-center my-3">
                                            <button
                                                    onClick={handlePrevPage}
                                                    className="my-3 py-2 px-3 cursor-pointer rounded-md border-2 border-gray-100 text-sm bg-white text-black"
                                                >
                                                    &lt;
                                                </button>
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleClick(index + 1)}
                                                    className={`my-3 py-2 px-3 cursor-pointer rounded-md border-2 border-gray-100 text-sm ${currentPage == index + 1 ? "bg-accent text-white": "bg-white text-black"}`}
                                                >
                                                    {index + 1}
                                                </button>
                                                
                                            ))}
                                            <button
                                                    onClick={handleNextPage}
                                                    className="my-3 py-2 px-3 cursor-pointer rounded-md border-2 border-gray-100 text-sm bg-white text-black"
                                                >
                                                    &gt;
                                                </button>
                                        </div>
                                    </div>  
                                    );
                                }
                                return null; // Fallback if none are selected
                            })()
                        )}
            
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