import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { AttributeType } from "../../models";
import { FormInput } from "../components/FormInput";
import { DatePicker } from "antd";
import './css/OtherInfoForm.css';


const { RangePicker } = DatePicker;


export const OtherInfoForm : FC<CollectionFormProps> = ({
    collection, setCollection
}) =>{

    return <div className="OtherInfoForm">
        <table cellPadding={3} cellSpacing={3}>
            <tbody>
            <tr>
                <td style={{textAlign:"left"}}>
                <RangePicker showTime />
                </td>
            </tr>
            <tr>
                <td style={{textAlign:"left"}}>
                <FormInput style={{maxWidth:"300px"}} label="Venue" 
                formItemStyle={{display:"inline"}}
                value  ={ (collection && collection.attributes) ? 
                    collection.attributes.filter((e)=>{
                        return e.name === AttributeType.Venue
                    })[0]?.value : ""
                }
                
                onChange={(e)=>{

                    if (setCollection && collection) {

                        let attrbs = collection.attributes;
                        if (attrbs === undefined) 
                            attrbs = [];
                        
                        attrbs.push({
                            name : AttributeType.Venue,
                            value : e.target.value,
                        });

                        setCollection({...collection, attributes : attrbs });
                    }
                }}
                />
                </td>
            </tr>

            <tr>
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

                    if (setCollection && collection) {

                        let attrbs = collection.attributes;
                        if (attrbs === undefined) 
                            attrbs = [];
                        
                        attrbs.push({
                            name : AttributeType.MaxTicketPerWallet,
                            value : e + "",
                        });

                        setCollection({...collection, attributes : attrbs });
                    }
                }}
                />
                </td>
            </tr>
            </tbody>
        </table>

    </div>
}