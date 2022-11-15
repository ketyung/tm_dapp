import { FC, useEffect, useState, useCallback} from "react";
import useTicketMintsContract from "../../hooks/useTicketMintsContract";
import { GSpinner } from "../components/GSpinner";
import { Line } from '@ant-design/charts';

export const SalesChartView : FC = () =>{

    const [config,setConfig]= useState<any>();

    const [loading,setLoading] = useState(false);

    const {getSalesCountInRange} = useTicketMintsContract();

    const getSalesData = useCallback(async ()=>{

        if ( config === undefined) {

            setLoading(true);
            let data = await getSalesCountInRange();
    
            console.log("data::", data, new Date());
            setConfig({
                data,
                height:200,
                step:1,
                xField: 'date',
                yField: 'value',
                title: "Ticket Sales",
                point: {
                    size: 5,
                    shape: 'circle',
                    color:"#00f",
                },
            });
    
            setLoading(false);
        }
       
    },[getSalesCountInRange]);


    useEffect(()=>{
        getSalesData();
    },[getSalesData]);


    const chartView = config && <Line style={{maxHeight:"250px", maxWidth:"98%"}} {...config} />;

    return <>{loading ? <GSpinner style={{marginTop:"30px"}}/> : chartView }</>;
}