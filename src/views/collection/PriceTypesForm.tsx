import { FC, useEffect } from "react";
import { Collection } from "../../models";
import { FormInput } from "../components/FormInput";
import './css/PriceTypesForm.css';

type Props = {

    collection? : Collection

    setCollection? : (collection: Collection)=> void,
}

export const PriceTypesForm : FC <Props> = ({
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

                    return <div className="row item">
                        <div className="col" style={{width:"2%"}}>{i+1}</div>
                        <div className="col" style={{width:"40%"}}>
                            <FormInput style={{maxWidth:"150px"}} value={e.ticket_type} onChange={(e)=>{
                                if ( setCollection && collection && collection.ticket_types) {
                                    let tt = collection.ticket_types[i];
                                    tt.ticket_type = e.target.value;
                                    collection.ticket_types[i]  = tt;
                                    setCollection(collection);
                                }
                            }}/>

                        </div>
                        <div className="col" style={{width:"25%"}}>
                            <FormInput style={{maxWidth:"100px"}} isNumber={true} value={e.price} onChange={(e)=>{
                                if ( setCollection && collection && collection.ticket_types) {
                                    let tt = collection.ticket_types[i];
                                  
                                    let price = e;

                                    if (!isNaN(price)) {
                                        tt.price = price;
                                        collection.ticket_types[i]  = tt;
                                        setCollection(collection);
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