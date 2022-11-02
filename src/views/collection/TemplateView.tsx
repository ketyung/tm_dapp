import { FC, useCallback, useEffect, useState } from "react";
import { CollectionFormProps } from "./Form";
import { genTemplateImageDataUri } from "./templates/util";
import { Button , Image } from "antd";


type Props = CollectionFormProps & {index ? : number };

export const TemplateView : FC <Props> = ({
    collection, index
}) =>{

    const [imageDataUri, setImageDataUri] = useState<string>();

    const obtainImageDataUri = useCallback(async ()=>{
       await genTemplateImageDataUri(collection,undefined, index, setImageDataUri);
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