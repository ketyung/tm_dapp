import { FC} from "react";
import { SalesChartView } from "./SalesChartView";
import { MintsList } from "./MintsList";

export const DashboardView : FC = () =>{


    return <div>
        <SalesChartView/><br/>
        <h3 style={{textAlign:"left",fontWeight:"600"}}>Recent Ticket Sales</h3>
        <MintsList />      
    </div>
}