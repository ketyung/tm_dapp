import { FC, useCallback, useEffect, useState } from "react";
import { CollectionFormProps } from "./Form";
import { Button } from "antd";
import * as template1 from "./templates/template1";
import imagePlaceHolder from './images/picture.png';

export const TemplateView : FC <CollectionFormProps> = ({
    collection
}) =>{

    const [imageDataUri, setImageDataUri] = useState<string>();

    const obtainImageDataUri = useCallback(async ()=>{

        let img = await template1.createImageDataUrl({
            title: collection?.title ? collection?.title : "Title goes here...",
            startDate : "10/10/2022 9:00AM",
            endDate : "10/10/2022 5:00PM",
            venue : "Kota Kinabalu",
            imageSrc : collection.icon ?? imagePlaceHolder,  
        });

        setImageDataUri(img);

    },[collection]);

    useEffect(()=>{
        obtainImageDataUri();
    },[obtainImageDataUri]);

    return <div className="TicketTemplateView">
    <><h3 style={{marginLeft:"28px",display:"inline-block"}}>Your Ticket's Appearance</h3>
    <Button shape="round" style={{marginLeft:"15px",background:"#458",
    color:"whitesmoke"}}>Change Template</Button>
    </>
    {imageDataUri && <img src={imageDataUri} 
    style={{width:"300px",height:"200px",border:"0px",marginLeft:"12px"}}/>}
    </div>
}