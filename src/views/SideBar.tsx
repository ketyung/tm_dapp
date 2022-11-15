import { FC } from "react";
import './css/SideBar.css';
import { ViewType } from "./View";

type Props = {

    setViewType? :(viewType : ViewType) => void,

    viewType? : ViewType,
}

export const SideBar : FC <Props> = ({
    setViewType, viewType
}) =>{

    return <div className="SideBar">
        <div className={viewType === ViewType.Dashboard ? "MenuSel" : "Menu"} onClick={()=>{
            if ( setViewType) setViewType(ViewType.Dashboard);  
        }}>
        Dashboard
        </div>
        <div className={viewType === ViewType.Collections ? "MenuSel" : "Menu"}  onClick={()=>{
            if ( setViewType) setViewType(ViewType.Collections);  
        }}>
        Ticket collections
        </div>
        <div className="Menu">
        Customers
        </div>
        <div className="Menu">
        <a href={process.env.REACT_APP_HOWTO_DOCS_URL} 
        target="_blank">Documentations</a>
        </div>
   
    </div>
}