import { FC, useEffect, useState} from "react";
import { getDatesDaysAgoTillNow, randomInt } from "../../utils";
import { Line } from '@ant-design/charts';

export const SalesChartView : FC = () =>{

    const [config,setConfig]= useState<any>();

    useEffect(()=>{

        let range = getDatesDaysAgoTillNow();

        let data : {date: string, value: string}[] = [];

        range.forEach(d=>{
            data.push ({date : d.toDateString(), value:`${randomInt(1,32)}`});
        });
        

        setConfig({
            data,
            xField: 'date',
            yField: 'value',
            title: "Ticket Sales",
            point: {
                size: 5,
                shape: 'circle',
                color:"#00f",
            },
        });

    },[]);


    return <>{config && <Line style={{maxHeight:"250px"}} {...config} />}</>;
}