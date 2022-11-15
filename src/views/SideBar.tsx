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
        Your ticket collections
        </div>
        <div className="Menu">
        Your customers
        </div>
    </div>
}