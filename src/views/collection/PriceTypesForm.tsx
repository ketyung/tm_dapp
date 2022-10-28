import { FC, useEffect } from "react";
import { Collection } from "../../models";
import { CollectionFormProps } from "./Form";
import { FormInput } from "../components/FormInput";
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

    return <div className="PriceTypesForm">
        <div className="header">
            <div className="row">
                <div className="col" style={{width:"2%"}}>No.</div>
                <div className="col" style={{width:"40%"}}>Price Type</div>
                <div className="col" style={{width:"25%"}}>Price (NEAR)</div>
            </div>
        </div>
        <div className="body">
               
        {
            collection?.ticket_types?.map((e,i) =>{

                    return <div className="row item" key={"ptype"+i}>
                        <div className="col" style={{width:"2%"}}>{i+1}</div>
                        <div className="col" style={{width:"40%"}}>
                            <FormInput style={{maxWidth:"150px"}} value={e.ticket_type} onChange={(e)=>{
                                if ( setCollection && collection && collection.ticket_types) {
                                    let tts = collection.ticket_types;
                                    tts[i].ticket_type = e.target.value;
                                    setCollection({...collection, ticket_types: tts });
                                }
                            }}/>

                        </div>
                        <div className="col" style={{width:"25%"}}>
                            <FormInput style={{maxWidth:"100px"}} isNumber={true} value={e.price} onChange={(e)=>{
                                if ( setCollection && collection && collection.ticket_types) {
                                    let tts = collection.ticket_types;
                                    let price = e;

                                    if (!isNaN(price)) {
                                   
                                        tts[i].price = price;
                                        setCollection({...collection, ticket_types: tts });
                                       
                                    }
                                  
                                }
                            }}/>

                        </div>

    
                    </div>
            })
        }
        </div>
       
    </div>
}