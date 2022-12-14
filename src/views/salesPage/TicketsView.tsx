import { Image, Spin } from "antd";
import { FC } from "react";

type Props = {
    tickets : any[],
}


export const TicketsView : FC <Props> = ({
    tickets
}) =>{

    return <div className="TicketsView">
        {
            tickets.map((t, i)=>{
                return <div key={"tkRow"+i} className="row">
                    <div>{(i+1)}. {t.metadata.title}</div>   
                    <div><Image src={t.metadata.media} placeholder={<Spin/>}
                    style={{width:"50%",height:"auto"}} title={t.metadata.title}/></div>
                </div>;
            })
        }
    </div>
}
