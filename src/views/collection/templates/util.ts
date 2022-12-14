import { Collection , AttributeType} from "../../../models";
import * as template1 from './template1';
import * as template2 from './template2';
import imagePlaceHolder from '../../../images/picture.png';

export const genTemplateImageDataUri = async (
    collection: Collection,
    ticketNo? : string, 
    index? : number, 
    setImageDataUriCallback? : (imageUri?: string) => void,
    _templateType? : number  ) =>{

    let templateType = _templateType ? _templateType : parseInt(collection.ticket_template_type?.value ?? "1");
    
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
    
    let ticketInfo = {
        title: collection?.title ? collection?.title : "Event name...",
        startDate : startDate,
        endDate : endDate,
        venue : venue,
        imageSrc : collection.icon ?? imagePlaceHolder,  
        ticketNo :ticketNo ?? "000000",
        ticketType : (collection.ticket_types) ? 
            collection?.ticket_types[index ?? 0] : undefined
    };

    switch (+templateType) {

        case 1 :
            img =   await template1.createImageDataUrl(ticketInfo);
            break; 

        case 2 :
            img =   await template2.createImageDataUrl(ticketInfo);
            break; 


        default :
            break; 
    }

    if (img) {

        if ( setImageDataUriCallback)
            setImageDataUriCallback(img);
    }
  
}