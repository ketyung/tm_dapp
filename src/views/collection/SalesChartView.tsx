import { FC, useEffect, useState, useCallback} from "react";
import useTicketMintsContract from "../../hooks/useTicketMintsContract";
import { Line } from '@ant-design/charts';

export const SalesChartView : FC = () =>{

    const [config,setConfig]= useState<any>();

    const {getSalesCountInRange} = useTicketMintsContract();

    const getSalesData = useCallback(async ()=>{

        let data = await getSalesCountInRange();

        setConfig({
            data,
            height:200,
            xField: 'date',
            yField: 'value',
            title: "Ticket Sales",
            point: {
                size: 5,
                shape: 'circle',
                color:"#00f",
            },
        });

    },[getSalesCountInRange]);


    useEffect(()=>{
        getSalesData();
    },[]);


    return <>{config && <Line style={{maxHeight:"250px", maxWidth:"98%"}} {...config} />}</>;
}