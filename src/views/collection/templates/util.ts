import { Collection , AttributeType} from "../../../models";
import * as template1 from './template1';
import imagePlaceHolder from '../images/picture.png';

export const genTemplateImageDataUri = async (
    templateType : number, 
    collection: Collection,
    index? : number, 
    setImageDataUriCallback? : (imageUri?: string) => void ) =>{

    
    let venue = collection.attributes?.filter(a=>{
        return a.name === AttributeType.Venue
    })[0]?.value;

    let startDate = collection.attributes?.filter(a=>{
        return a.name === AttributeType.StartDate
    })[0]?.value; 

    let endDate = collection.attributes?.filter(a=>{
        return a.name === AttributeType.EndDate
    })[0]?.value; 
    


    let img : string|undefined = undefined;
    
    switch (+templateType) {

        case 1 :
            img =   await template1.createImageDataUrl({
                title: collection?.title ? collection?.title : "Event name...",
                startDate : startDate,
                endDate : endDate,
                venue : venue,
                imageSrc : collection.icon ?? imagePlaceHolder,  
                ticketNo : "#000001",
                ticketType : (collection.ticket_types) ? 
                    collection?.ticket_types[index ?? 0] : undefined
            });

            break; 
        default :
            break; 
    }

    if (img) {

        if ( setImageDataUriCallback)
            setImageDataUriCallback(img);
    }
  
}