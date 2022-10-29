import { FC, useEffect } from "react";
import { CollectionFormProps } from "./Form";
import { PriceTypeRow } from "./PriceTypeRow";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import './css/PriceTypesForm.css';

export const PriceTypesForm : FC <CollectionFormProps> = ({
    collection,setCollection
}) =>{

    useEffect(()=>{

        if (collection){

            if (collection.ticket_types === undefined && setCollection) {

                setCollection({
                    ...collection,
                    ticket_types:  [{ticket_type : "Standard", price : 1.00}]
                });
            }
        }

    },[]);

    const addMoreRows = () =>{

        if ( collection && setCollection ) {

            let tts = collection.ticket_types;
            if (tts) {

                let idx = tts?.length ?? 0; 
                let idxs = idx > 1 ? " " + idx  : "";

                setCollection({...collection, ticket_types : [...tts, {
                    ticket_type : "Premium" + idxs,
                    price : 2.00 + (idx - 1)
                }]});
            }
            
        }
    }

    const removeLastRow = () =>{

        if ( collection && setCollection ) {

            let tts = collection.ticket_types;
            if ( tts && tts.length > 1) {
                tts?.pop();
                setCollection({...collection, ticket_types : tts});
            }
        }
    }


    return <div className="PriceTypesForm">
        <table style={{width:"99%"}} cellPadding={2} cellSpacing={2}>
        <thead>   
            <tr>             
                <th style={{width:"2%"}}>No.</th>
                <th style={{width:"40%",textAlign:"left",paddingLeft:"20px"}}>Price Type</th>
                <th style={{width:"20%"}}>Price In NEAR</th>
                <th style={{width:"20%"}}>Color Code</th>
                <th style={{width:"15%"}}><PlusCircleOutlined
                onClick={()=>{ addMoreRows();}}/>
                <MinusCircleOutlined style={{marginLeft:"20px"}}
                onClick={()=>{ removeLastRow();}}/>
                </th>
            </tr>
        </thead>
        <tbody>
        {
            collection?.ticket_types?.map((t,i) =>{
                return <PriceTypeRow collection={collection} key={"prcRow"+i}
                setCollection={setCollection} index={i} ticketType={t}/>
            })
        }
        </tbody>
        </table>
       
    </div>
}