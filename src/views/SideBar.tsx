import { FC } from "react";
import { DashboardOutlined, BulbOutlined, InfoCircleOutlined, TeamOutlined } from "@ant-design/icons";
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
        <DashboardOutlined style={{marginRight:"10px"}}/>Dashboard
        </div>
        <div className={viewType === ViewType.Collections ? "MenuSel" : "Menu"}  onClick={()=>{
            if ( setViewType) setViewType(ViewType.Collections);  
        }}>
        <BulbOutlined style={{marginRight:"10px"}}/>Events
        </div>
        <div className={viewType === ViewType.Customers ? "MenuSel" : "Menu"} onClick={()=>{
            if ( setViewType) setViewType(ViewType.Customers);  
        }}>
        <TeamOutlined style={{marginRight:"10px"}}/>Customers
        </div>
        <div className="Menu">
        <InfoCircleOutlined style={{marginRight:"10px"}}/><a href={process.env.REACT_APP_HOWTO_DOCS_URL} 
        target="_blank">Documentations</a>
        </div>
   
    </div>
}