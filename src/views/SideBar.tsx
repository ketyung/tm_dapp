import { FC } from "react";
import './css/SideBar.css';
import { ViewType } from "./View";

type Props = {

    setViewType? :(viewType : ViewType) => void,
}

export const SideBar : FC <Props> = ({
    setViewType
}) =>{

    return <div className="SideBar">
        <div className="Menu" onClick={()=>{
            if ( setViewType) setViewType(ViewType.Dashboard);  
        }}>
        Dashboard
        </div>
        <div className="Menu" onClick={()=>{
            if ( setViewType) setViewType(ViewType.Collections);  
        }}>
        Your ticket collections
        </div>
        <div className="Menu">
        Your customers
        </div>
    </div>
}