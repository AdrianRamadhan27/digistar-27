import { useContext, createContext, useState } from "react"
import { SlRocket } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FaChartLine, FaWhatsapp  } from "react-icons/fa6";
import { LuMailCheck, LuMessageCircle, LuMail, LuArchive, LuHome, LuWallet, LuLineChart  } from "react-icons/lu";
import { TbTemplate } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
const SidebarContext = createContext()
export default function LeftBar({expanded, setExpanded}) {
    return (
        <aside className="h-screen fixed">
            <nav 
                className={`overflow-hidden h-full flex flex-col border-r-2 border-r-primary overflow-y-auto ${
                    expanded ? "w-60 bg-white" : "w-20 bg-secondary shadow-lg"
                  }`}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >   
                 <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-5 px-3 border-b-2 border-b-primary">
                        <LeftBarItem path="/" icon={LuHome} text="Dashboard"/>
                        <LeftBarItem path="/billing/"  icon={LuWallet} text="Billing"/>
                        <LeftBarItem path="/introduction/"  icon={SlRocket} text="Getting Started"/>
                        <LeftBarItem path="/contacts/"  icon={GoPeople} text="Contacts"/>
                        <LeftBarItem path="/analytics/"  icon={LuLineChart} text="Analytics"/>
                    </ul>
                    <ul className="flex-2 px-3 border-b-2 border-b-primary">
                        <LeftBarItem path="/validation/"  icon={LuMailCheck} text="Validation"/>
                        <LeftBarItem path="/template/"  icon={TbTemplate} text="Template"/>
                    </ul>
                    <ul className="flex-4 px-3 border-b-2 border-b-primary">
                        <LeftBarItem path="/voice/"  icon={FiPhone} text="Voice"/>
                        <LeftBarItem path="/sms/"  icon={LuMessageCircle} text="SMS"/>
                        <LeftBarItem path="/email/"  icon={LuMail} text="Email"/>
                        <LeftBarItem path="/whatsapp/"  icon={FaWhatsapp} text="Whatsapp"/>
                    </ul>
                    <ul className="flex-1 px-3 border-b-2 border-b-primary">
                        <LeftBarItem path="/interaction/"  icon={LuArchive} text="Interaction"/>
                    </ul>
                 </SidebarContext.Provider>
                
            </nav>

        </aside>
    );
}



export function LeftBarItem({ icon, text, path }) {
    const location = useLocation();
    const { expanded } = useContext(SidebarContext)
    const IconComponent = icon;
    return (
      <Link to={path}>
        <li
        className={`p-4
          relative flex items-center 
          font-medium rounded-md cursor-pointer
          transition-colors group hover:bg-pink-100 h-11
          ${
            path==location.pathname
              ? "text-black font-bold"
              : "text-gray-400 font-light"
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
      </Link>

    )
  }
