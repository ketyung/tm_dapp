export interface User {

    id? : string,

    first_name? : string,

    last_name ?: string, 

    email? : string,

    mobile_number? : string,

    profile_image? : string,

    date_created? : number,
    
    date_updated? : number,

}

export enum MessageType {

    Error,

    Info, 
}

export interface Message{

    type : MessageType,
    
    text : string, 
}


export enum Page {

    EditUserProfile,

    Home, 

    TicketSales,
}

export enum AttributeType {

    StartDate = 'StartDate',

    EndDate = 'EndDate', 

    Venue = 'Venue',

    MaxTicketPerWallet = 'MaxTicketPerWallet',

    SalesPageTemplate = 'SalesPageTemplate',

    Twitter = 'Twitter',

    Facebook = 'Facebook',

    Website = 'Website',

    Status = 'Status',
}


export interface Attribute{

    name : AttributeType,

    value : string, 
}

export interface TicketType {

    ticket_type : string,

    price : number, 

    color_code? : string ,
}

export enum TicketTemplateType {

    Fixed = 'Fixed',

    Custom = 'Custom',
}


export interface TicketTemplate {

    value : string, 

    template_type : TicketTemplateType,

}


export interface Collection {

    title : string, 

    symbol : string,

    description? : string, 

    // the icon/logo of the collection
    icon? : string ,

    base_uri? : string,
    
    contract_id? : string ,

    ticket_types? : TicketType[],

    total_tickets? : number,
    
    tickets_sold? : number,

    attributes? : Attribute[],

    ticket_template_type? : TicketTemplate,

    category? : string,

    owner : string, 

    date_updated? : number, 

}

export interface CollectionId {

    title : string,

    owner : string,

    symbol : string, 
}

export interface ShortCorrectionInfo {

    collectionId : CollectionId,

    templateId? : number, 

    icon? : string, 
}


export enum TicketAttributeType {

    IsUsed = 'IsUsed',

    DateUsed = 'DateUsed', 

    Price = 'Price',

    UsedBy = 'UsedBy', 

    TicketType = 'TicketType',
}


export interface TicketAttribute {

    name : TicketAttributeType,

    value? : string ,
}


export interface TicketMint {

    collection_id : CollectionId,

    token_id : string,

    attributes : TicketAttribute[],

    mint_by : string,

    date : number,
}


export interface TicketInfo {

    title? : string,

    imageSrc? : string, 
    
    ticketNo? : string,
    
    venue? : string,
    
    startDate? : string, 
    
    endDate? : string,

    ticketType? : TicketType,
}


export interface SalesPageTemplate{

    id : number,

    name : string, 
} 


export const SALE_PAGE_TEMPLATES : SalesPageTemplate[] = [
    {id :1 , name : "Oceanic"},
    {id :2 , name : "Dark Knight"}
];
