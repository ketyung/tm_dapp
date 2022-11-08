import { TicketTemplateType } from '../../models';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { genTemplateImageDataUri } from './templates/util';
import { FC, useEffect, useState,useCallback } from 'react';
import { CollectionFormProps } from './Form';



type Props = CollectionFormProps & { template : number, name? : string  };



export const TicketTemplateSelect : FC <Props> = ({
    collection, setCollection, template, name 
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
     <div style={{marginLeft:"10px"}}>{name}{parseInt(collection.ticket_template_type?.value ?? "1") === 
     template && <CheckCircleTwoTone style={{marginLeft:"10px"}}/>}</div>
    </div>
}