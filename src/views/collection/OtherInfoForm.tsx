import { FC , useState, useEffect} from "react";
import { CollectionFormProps } from "./Form";
import { Attribute, AttributeType, Collection } from "../../models";
import { FormInput } from "../components/FormInput";
import { DatePicker } from "antd";
import moment from 'moment';
import { EnvironmentOutlined } from "@ant-design/icons";
import './css/OtherInfoForm.css';


const { RangePicker } = DatePicker;

const REQ_DATE_FORMAT = "DD/MMM/YY HH:mm ZZ";


export const setAttributeValue =(collection : Collection, attrbType : AttributeType, value : string) : Attribute[] => {

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

export const setCollectionAttribute = (
    attrbType : AttributeType, value : string,
    collection? : Collection,
    setCollection? : (collection: Collection)=> void) =>{

    if ( setCollection && collection) {

        let attrbs = setAttributeValue(collection, attrbType, value);
        setCollection({...collection, attributes : attrbs });
       
    }
    
}


export const OtherInfoForm : FC<CollectionFormProps> = ({
    collection, setCollection, isEditMode
}) =>{


    const setAttribValue = (attrbType : AttributeType, value : string) : Attribute[] => {

        return setAttributeValue(collection, attrbType, value);
    }

    const setCollectionAttrib = (
        attrbType : AttributeType, value : string) =>{

        if ( collection && setCollection){
            
            setCollectionAttribute(attrbType,value,collection, setCollection);
        }
    }


    const [dateRange, setDateRange] = useState<{startDate: moment.Moment, endDate : moment.Moment }>();

    useEffect (()=>{

        if ( isEditMode ) {

            let startDate = moment(collection.attributes?.filter(a=>
                a.name === AttributeType.StartDate
            )[0]?.value, REQ_DATE_FORMAT) ;
               
            let endDate = moment(collection.attributes?.filter(a=>
                a.name === AttributeType.EndDate
            )[0]?.value, REQ_DATE_FORMAT) ;
            

         //   console.log("endDate", endDate, new Date());
            
            setDateRange({startDate : startDate, endDate : endDate});
        }

    },[collection,isEditMode]);



    return <div className="OtherInfoForm">
        <table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr>
                    <td colSpan={2}>Dates &amp; Venue</td>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{textAlign:"left"}} colSpan={2}>
                <RangePicker showTime style={{minWidth:"400px"}}
                value={isEditMode && dateRange ? 
                    [dateRange.startDate.isValid() ? dateRange.startDate : null, 
                    dateRange.endDate.isValid() ? dateRange.endDate : null] : undefined}
                format={REQ_DATE_FORMAT}
                onChange={(e)=>{

                    let attrbs = setAttribValue(AttributeType.StartDate, 
                        e?.[0]?.format(REQ_DATE_FORMAT).toString() ?? "" );

                    let attrbs2 = setAttribValue(AttributeType.EndDate, 
                        e?.[1]?.format(REQ_DATE_FORMAT).toString() ?? "" );

                    let a = attrbs2.filter((a)=> {
                        return (a.name === AttributeType.EndDate)})[0];

                    let attrbs3 = [...attrbs, a ];
                    
                    if ( setCollection)
                        setCollection({...collection, attributes : attrbs3 });
                    
                }}/>
                </td>
            </tr>
            <tr>
                <td style={{textAlign:"left",width:"88%"}}>
                <FormInput style={{maxWidth:"400px"}} label="Venue" 
                formItemStyle={{display:"inline"}}
                value  ={ (collection && collection.attributes) ? 
                    collection.attributes.filter((e)=>{
                        return e.name === AttributeType.Venue
                    })[0]?.value : ""
                }
                
                onChange={(e)=>{
                    setCollectionAttrib(AttributeType.Venue, e.target.value);
                }}/>
                </td>
                <td style={{width:"10%",textAlign:"left"}}>
                  <EnvironmentOutlined style={{marginLeft:"6px",display:"inline-block",cursor:"pointer"}}/>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
}