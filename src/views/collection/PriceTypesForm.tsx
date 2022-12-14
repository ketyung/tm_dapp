import { FC, useEffect } from "react";
import { CollectionFormProps } from "./Form";
import { PriceTypeRow } from "./PriceTypeRow";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import './css/PriceTypesForm.css';

export const DEFAULT_COLOR_CODE = "#34d";

type Props = CollectionFormProps & {
    setSelectedRowForPreview? : (index? : number) => void };
    
export const PriceTypesForm : FC <Props> = ({
    collection,setCollection, setSelectedRowForPreview, isEditMode
}) =>{

    useEffect(()=>{

        if (collection){

            if (collection.ticket_types === undefined && setCollection) {

                setCollection({
                    ...collection,
                    ticket_types:  [{ticket_type : "Standard", price : 1.00, 
                    color_code : DEFAULT_COLOR_CODE}]
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
                    price : 2.00 + (idx - 1),
                    color_code : DEFAULT_COLOR_CODE,
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
                <th style={{width:"40%",textAlign:"left",paddingLeft:"40px"}}>Price Type</th>
                <th style={{width:"20%",textAlign:"left",paddingLeft:"10px"}}>Price In NEAR</th>
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
                setCollection={setCollection} index={i} ticketType={t} 
                setSelectedRowForPreview={setSelectedRowForPreview} isEditMode={isEditMode}/>
            })
        }
        </tbody>
        </table>
       
    </div>
}