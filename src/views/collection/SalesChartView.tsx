import { FC, useEffect, useState} from "react";
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
            yField: 'value',
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

    useEffect(()=>{

        setLoading(true);

        if ( config === undefined || config.data.length < 6) {

            
            getSalesCountInRange()
            .then((data:any) =>{

                setConfig({...config, 
                    data
                });
        
                setTimeout(()=>{
                    setLoading(false);
                },300);         

            })
            .catch((e : Error)=>{

                window.alert(e.message);
                setLoading(false);            
            
            })
    
               
            
        }
        
    },[]);


    

    
    return <>{loading ? <GSpinner style={{marginTop:"30px"}} text="Loading chart..."/> : 
    <Line style={{maxHeight:"250px", maxWidth:"98%"}} {...config} /> }</>;
}