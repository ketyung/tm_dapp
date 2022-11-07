import { TicketTemplateType } from '../../models';
import { CheckCircleOutlined } from '@ant-design/icons';
import { genTemplateImageDataUri } from './templates/util';
import { FC, useEffect, useState,useCallback } from 'react';
import { CollectionFormProps } from './Form';



type Props = CollectionFormProps & { template : number  };



export const TicketTemplateSelect : FC <Props> = ({
    collection, setCollection, template
}) =>{


    const [imageDataUri, setImageDataUri] = useState<string>();

    const obtainImageDataUri = useCallback(async ()=>{
        await genTemplateImageDataUri(collection,undefined, 0, setImageDataUri, template);
     },[template]);
 

    useEffect(()=>{
        obtainImageDataUri();
    },[obtainImageDataUri])

    return <div style={{cursor:"pointer"}} onClick={()=>{

        if ( collection && setCollection){
            setCollection({...collection, ticket_template_type : {
                value :`${template}` , template_type : TicketTemplateType.Fixed
            }});
        }
       
    }}>
     <img src={imageDataUri} style={{width:"200px",height:"120px"}}/> 
     {parseInt(collection.ticket_template_type?.value ?? "1") === template && 
     <div style={{marginLeft:"10px"}}><CheckCircleOutlined/></div>}  
    </div>
}