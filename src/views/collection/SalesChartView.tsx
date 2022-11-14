import { FC, useEffect, useState } from "react";
import { getDates7DaysAgoTillNow } from "../../utils";


export const SalesChartView : FC = () =>{


    let range = getDates7DaysAgoTillNow();

    const [data, setData] = useState<{date: string, value: string}[]>([]);
    
    const config = {
        data,
        xField: 'date',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };

    useEffect(()=>{

        range.forEach(d=>{
            setData([...data, {date : d.toDateString(), value:"1"}]);
        });
    },[]);


    return <>
    </>
}