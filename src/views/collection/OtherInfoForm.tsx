import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { Attribute, AttributeType } from "../../models";
import { FormInput } from "../components/FormInput";
import { DatePicker } from "antd";
import './css/OtherInfoForm.css';


const { RangePicker } = DatePicker;

const REQ_DATE_FORMAT = "DD/MMM/YY HH:mm";


export const OtherInfoForm : FC<CollectionFormProps> = ({
    collection, setCollection
}) =>{


    const setAttributeValue =( attrbType : AttributeType, value : string) : Attribute[] => {

        let attrbs = collection.attributes;
        if (attrbs === undefined) {

            attrbs = [{
                name : attrbType,
                value : value,
            }];
        }
        else {

            let i = attrbs.findIndex((a => a.name === attrbType));
            
            if ( i >= 0 ) {

                attrbs[i] = {
                    name : attrbType,
                    value : value,
                };
    
            }
            else {

                attrbs.push({
                    name : attrbType,
                    value : value,
                });
            }
        }

        return attrbs;
      
    }

    const setCollectionAttrib = (attrbType : AttributeType, value : string) =>{

        if ( setCollection && collection) {

            let attrbs = setAttributeValue(attrbType, value);
            setCollection({...collection, attributes : attrbs });
        }   
    }

    return <div className="OtherInfoForm">
        <table cellPadding={3} cellSpacing={3}>
            <tbody>
            <tr>
                <td style={{textAlign:"left"}} colSpan={2}>
                <RangePicker showTime  
                format={'DD/MMM/YY HH:mm'}
                onChange={(e)=>{

                    let attrbs = setAttributeValue(AttributeType.StartDate, 
                        e?.[0]?.format(REQ_DATE_FORMAT).toString() ?? "" );

                    //console.log("a1",attrbs);

                    let attrbs2 = setAttributeValue(AttributeType.EndDate, 
                        e?.[1]?.format(REQ_DATE_FORMAT).toString() ?? "" );

                    let a = attrbs2.filter((a)=> {
                        return (a.name === AttributeType.EndDate)})[0];

                    let attrbs3 = [...attrbs, a ];

                    //console.log("a3", attrbs3);
                    
                    if ( setCollection)
                        setCollection({...collection, attributes : attrbs3 });
                    
                }}/>
                </td>
            </tr>
            <tr>
                <td style={{textAlign:"left"}}>
                <FormInput style={{maxWidth:"180px"}} label="Venue" 
                formItemStyle={{display:"inline"}}
                value  ={ (collection && collection.attributes) ? 
                    collection.attributes.filter((e)=>{
                        return e.name === AttributeType.Venue
                    })[0]?.value : ""
                }
                
                onChange={(e)=>{
                    setCollectionAttrib(AttributeType.Venue, e.target.value);
                }}
                />
                </td>
                <td style={{textAlign:"left"}}>
                <FormInput isNumber={true} style={{maxWidth:"100px"}} 
                formItemStyle={{display:"inline"}}
                label="Max Ticket Per Wallet" min={1} max={10} step={1}
                value  ={ (collection && collection.attributes) ? 
                    collection.attributes.filter((e)=>{
                        return e.name === AttributeType.MaxTicketPerWallet
                    })[0]?.value : 1
                }
                
                onChange={(e)=>{
                    setCollectionAttrib(AttributeType.MaxTicketPerWallet, e + "");
                }}
                />
                </td>
            </tr>
            </tbody>
        </table>

    </div>
}