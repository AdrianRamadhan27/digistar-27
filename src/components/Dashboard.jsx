import { useState } from "react";
import RightBar from "./RightBar";
import ComplaintHandling from "./visualizations/ComplaintHandling";
import TicketHandling from "./visualizations/TicketHandling";
import TicketStatus from "./visualizations/TicketStatus";
import SurveyCompletion from "./visualizations/SurveyCompletion";
export default function Dashboard() {
    const [expanded, setExpanded] = useState(false);


    const [filters, setFilters] = useState({
        complaint: true,
        ticket: true,
        status: true,
        survey: false,
      });
    
      // Handle changes in the checkbox states
      const handleFilterChange = (filterName) => {
        setFilters((prevState) => ({
          ...prevState,
          [filterName]: !prevState[filterName],
        }));
      };

    return (
        <div className="flex w-full">
            <div className={`${expanded ? "mr-64" : "mr-14"} w-full `}>
                <div className="text-right mr-5">
                    <button className="text-white bg-accent hover:bg-accent-hover rounded-b-md p-2 text-sm font-semibold">Export to PDF</button>
                </div>
                <div className="p-5 mt-5 border-b-2 border-b-primary">
                    <div className="bg-gradient-to-r from-white via-pink-400/50 to-accent/50 bg-opacity-50 flex justify-between rounded-md w-full p-5 h-40">
                        <div className="flex flex-col text-left gap-3">
                            <img src={import.meta.env.BASE_URL+"images/logo.png"} alt="" className="w-32"/>
                            <div className="w-fit rounded-full p-1 text-white bg-accent text-xs font-semibold">OCA Interaction</div>
                            <h1 className="text-accent font-extrabold text-3xl truncate">Data Visualization Dashboard</h1>
                        </div>
                        <img src={import.meta.env.BASE_URL+"images/cover.png"} alt="" className="overflow-clip"/>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 p-5 text-primarytext">
                        <h2 className="font-bold text-xl">Filters</h2>
                        <p className="max-w-4xl">Customize your data analysis by selecting specific criteria that match your needs. Choose from various filter options, such as data collection date, location, and other relevant parameters, to refine your results.</p>

                        <h3 className="font-bold text-md">Service Performance Metrics</h3>
                        <div className="grid grid-cols-2 grid-rows-2 max-w-4xl gap-5">
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="complaint" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={filters.complaint} onClick={() => handleFilterChange('complaint')}/>
                                <label htmlFor="complaint" className="text-sm text-primarytext">Chat complaint handling</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="status" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={filters.status} onClick={() => handleFilterChange('status')}/>
                                <label htmlFor="status" className="text-sm text-primarytext">Ticket status monitoring</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="ticket" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={filters.ticket} onClick={() => handleFilterChange('ticket')}/>
                                <label htmlFor="ticket" className="text-sm text-primarytext">Ticket handling</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="survey" className="accent-accent ring-2 ring-accent w-fit h-fit ring-inset" checked={filters.survey} onClick={() => handleFilterChange('survey')}/>
                                <label htmlFor="survey" className="text-sm text-primarytext">Survey completion rate</label>
                            </div>
                        </div>

                    </div>
                </div>

                {filters.complaint && 
                    <ComplaintHandling />
                }
                
                
                {filters.ticket && 
                    <TicketHandling />
                }

                
                {filters.status && 
                    <TicketStatus />
                }

                
                {filters.survey && 
                    <SurveyCompletion />
                }
            </div>
            <RightBar expanded={expanded} setExpanded={setExpanded}/>
        </div>
        
    );
}