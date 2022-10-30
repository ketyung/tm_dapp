import { FC, useCallback, useEffect, useState } from "react";
import { CollectionFormProps } from "./Form";
import { Button , Image } from "antd";
import { AttributeType } from "../../models";
import * as template1 from "./templates/template1";
import imagePlaceHolder from './images/picture.png';

type Props = CollectionFormProps & {index ? : number };

export const TemplateView : FC <Props> = ({
    collection, index
}) =>{

    const [imageDataUri, setImageDataUri] = useState<string>();

    const obtainImageDataUri = useCallback(async ()=>{

        let venue = collection.attributes?.filter(a=>{
            return a.name === AttributeType.Venue
        })[0].value;

        let img = await template1.createImageDataUrl({
            title: collection?.title ? collection?.title : "Event name...",
            startDate : "10/10/2022 9:00AM",
            endDate : "10/10/2022 5:00PM",
            venue : venue,
            imageSrc : collection.icon ?? imagePlaceHolder,  
            ticketNo : "#000001",
            ticketType : (collection.ticket_types) ? 
                collection?.ticket_types[index ?? 0] : undefined
        });

        setImageDataUri(img);

    },[collection, index]);

    useEffect(()=>{
        obtainImageDataUri();
    },[obtainImageDataUri]);

    return <div className="TicketTemplateView">
    <><h3 style={{marginLeft:"28px",display:"inline-block"}}>Preview Of Ticket</h3>
    <Button shape="round" style={{marginLeft:"15px",background:"#458",
    color:"whitesmoke"}}>Change Template</Button>
    </>
    {imageDataUri && <Image src={imageDataUri} 
    style={{width:"300px",height:"180px",border:"0px",marginLeft:"12px"}}/>}
    </div>
}