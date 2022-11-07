import { FC, useCallback, useEffect, useState } from "react";
import { CollectionFormProps } from "./Form";
import { genTemplateImageDataUri } from "./templates/util";
import { TicketTemplatesView } from "./TicketTemplatesView";
import { Button , Image } from "antd";


type Props = CollectionFormProps & {index ? : number };

export const TemplateView : FC <Props> = ({
    collection, index, setCollection
}) =>{

    const [imageDataUri, setImageDataUri] = useState<string>();

    const [viewMode, setViewMode] = useState(0);

    const obtainImageDataUri = useCallback(async ()=>{
       await genTemplateImageDataUri(collection,undefined, index, setImageDataUri);
    },[collection, index]);

    useEffect(()=>{
        obtainImageDataUri();
    },[obtainImageDataUri]);


    const switchView = () =>{

        switch(+viewMode) {

            case 1 :
                return <TicketTemplatesView collection={collection} setCollection={setCollection}/>

            default :
                return imageDataUri ? <Image src={imageDataUri} 
                style={{width:"300px",height:"180px",border:"0px",marginLeft:"12px"}}/> : <></>

        }
    }

    return <div className="TicketTemplateView">
    <><h3 style={{marginLeft:"28px",display:"inline-block"}}>Preview Of Ticket</h3>
    <Button shape="round" style={{marginLeft:"15px",background:"#458",
    color:"whitesmoke"}} onClick={()=>{
        if (viewMode === 1 ) setViewMode(0); else setViewMode(1); 
    }}>{viewMode === 0 ? "Change Template" : "Close"}</Button>
    </>
    {switchView()}
    </div>
}