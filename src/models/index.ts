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

    CreateToken,

    NFT,

    Test,
}

export enum AttributeType {

    StartDate = 'StartDate',

    EndDate = 'EndDate', 

    StartTime = 'StartTime',

    EndTime = 'EndTime', 

    MaxTicketPerWallet = 'MaxTicketPerWallet',

    SalesPageTemplate = 'SalesPageTemplate',
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