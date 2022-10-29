import { FC, useEffect } from "react";
import { CollectionFormProps } from "./Form";
import { FormInput } from "../components/FormInput";
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

            let idx = tts?.length ?? 0; 
            let idxs = idx > 1 ? " " + idx  : "";

            tts?.push ({
                ticket_type : "Premium" + idxs,
                price : 2.00 + (idx - 1)
            });

            setCollection({...collection, ticket_types : tts});
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
                <th style={{width:"25%"}}>Price In NEAR</th>
                <th style={{width:"20%"}}><PlusCircleOutlined
                onClick={()=>{ addMoreRows();}}/>
                <MinusCircleOutlined style={{marginLeft:"20px"}}
                onClick={()=>{ removeLastRow();}}/>
                </th>
            </tr>
        </thead>

        <tbody>
               
        {
            collection?.ticket_types?.map((e,i) =>{

                    return <tr key={"ptype"+i}>
                        <td valign="top" style={{width:"2%"}}>{i+1}</td>
                        <td valign="top" style={{width:"40%"}}>
                            <FormInput style={{maxWidth:"150px"}} 
                            formItemStyle={{display:"inline"}}
                            value={e.ticket_type} onChange={(e)=>{
                                if ( setCollection && collection && collection.ticket_types) {
                                    let tts = collection.ticket_types;
                                    tts[i].ticket_type = e.target.value;
                                    setCollection({...collection, ticket_types: tts });
                                }
                            }}/>

                        </td>
                        <td valign="top" style={{width:"35%",textAlign:"left",
                        paddingLeft:"12px"}} colSpan={2}>
                            <FormInput style={{maxWidth:"100px"}} 
                            formItemStyle={{display:"inline"}}
                            isNumber={true} value={e.price} onChange={(e)=>{
                                if ( setCollection && collection && collection.ticket_types) {
                                    let tts = collection.ticket_types;
                                    let price = e;

                                    if (!isNaN(price)) {
                                   
                                        tts[i].price = price;
                                        setCollection({...collection, ticket_types: tts });
                                       
                                    }
                                  
                                }
                            }}/>

                        </td>

    
                    </tr>
            })
        }
        </tbody>
        </table>
       
    </div>
}