import { useContext, createContext, useState } from "react"
import { CiHome, CiWallet } from "react-icons/ci";
import { SlRocket } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FaChartLine, FaWhatsapp  } from "react-icons/fa6";
import { LuMailCheck, LuMessageCircle, LuMail, LuArchive } from "react-icons/lu";
import { TbTemplate } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";

const SidebarContext = createContext()
export default function LeftBar() {
    const [expanded, setExpanded] = useState(false);
    return (
        <aside className="h-screen ">
            <nav 
                className={` h-full flex flex-col border-r-2 border-r-primary justify-start ${
                    expanded ? "w-60" : "w-20 bg-secondary"
                  }`}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >   
                 <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-5 px-3 border-b-2 border-b-primary">
                        <LeftBarItem icon={CiHome} text="Dashboard" />
                        <LeftBarItem icon={CiWallet} text="Billing"/>
                        <LeftBarItem icon={SlRocket} text="Getting Started"/>
                        <LeftBarItem icon={GoPeople} text="Contacts"/>
                        <LeftBarItem icon={FaChartLine} text="Analytics" active/>
                    </ul>
                    <ul className="flex-2 px-3 border-b-2 border-b-primary">
                        <LeftBarItem icon={LuMailCheck} text="Validation"/>
                        <LeftBarItem icon={TbTemplate} text="Template"/>
                    </ul>
                    <ul className="flex-4 px-3 border-b-2 border-b-primary">
                        <LeftBarItem icon={FiPhone} text="Voice"/>
                        <LeftBarItem icon={LuMessageCircle} text="SMS"/>
                        <LeftBarItem icon={LuMail} text="Email"/>
                        <LeftBarItem icon={FaWhatsapp} text="Whatsapp"/>
                    </ul>
                    <ul className="flex-1 px-3 border-b-2 border-b-primary">
                        <LeftBarItem icon={LuArchive} text="Interaction"/>
                    </ul>
                 </SidebarContext.Provider>
                
            </nav>

        </aside>
    );
}



export function LeftBarItem({ icon, text, active, nested }) {
    const { expanded } = useContext(SidebarContext)
    const IconComponent = icon;
    return (
      <li
        className={`p-4
          relative flex items-center 
          font-medium rounded-md cursor-pointer
          transition-colors group hover:bg-pink-100
          ${
            active
              ? "text-black font-extrabold"
              : "text-gray-500"
          }
      `}
      >
        <IconComponent className="w-fit"/>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-30 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
  
        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md ml-6
            bg-pink-100 text-pink-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    )
  }
