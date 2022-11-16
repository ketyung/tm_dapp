import { FC, useEffect, useState, useCallback} from "react";
import useTicketMintsContract from "../../hooks/useTicketMintsContract";
import { GSpinner } from "../components/GSpinner";
import { Line } from '@ant-design/charts';

export const SalesChartView : FC = () =>{

    const [config,setConfig]= useState<any>(

        {
            data : [{date : "", value :0}],
            height:200,
            step:1,
            xField: 'date',
            yField: 'count',
            title: "Ticket Sales",
            point: {
                size: 5,
                shape: 'circle',
                color:"#00f",
            },
        }
    );

    const [loading,setLoading] = useState(false);

   
    const {getSalesCountInRange} = useTicketMintsContract();

    const fetchSalesCountNow = async () =>{

        setLoading(true);

        let data = await getSalesCountInRange();

        setConfig({...config, 
            data
        });

        setTimeout(()=>{
            setLoading(false);
        },300);             
                               
    }

    const fetchSalesCount = useCallback (async ()=>{

        await fetchSalesCountNow();

    },[fetchSalesCountNow]);

    useEffect(()=>{
        fetchSalesCount();      
    },[]);


    

    
    return <>{loading ? <GSpinner style={{marginTop:"30px"}} text="Loading chart..."/> : 
    <Line style={{maxHeight:"250px", maxWidth:"98%"}} {...config} /> }</>;
}