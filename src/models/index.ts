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

