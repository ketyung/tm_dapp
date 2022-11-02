import { Wallet } from "./Wallet";
import { TicketType, User } from "../models";
import { NEAR_TOKEN_DECIMALS } from "./const";
import { Collection, CollectionId } from "../models";
import { collectionIdToB64 } from "../utils";

const BN = require("bn.js");

export class UsersContract {

    contractId? : string;

    wallet? : Wallet;

    constructor(contractId? : string , walletToUse?  : Wallet) {
        this.contractId = contractId;
        this.wallet = walletToUse;    
    }

    async hasUser(){

        try {

            let b =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'has_user',
                args: { user_id:  this.wallet.accountId}
            });

            //console.log("UsersContract.hasUser@", this.contractId, b, new Date());
            return b;
        }
        catch( e: any) {
            console.error("err@hasUser@", e, new Date());
            return false;
        }
        
    } 


    async getUser() : Promise<User>{

        try {

            return await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_user',
                args: { user_id:  this.wallet.accountId}
            });
        }
        catch(e : any) {
            
            console.log("err@getUser@", e, new Date());
          
            return {};
        }
    } 

   
    async signUpUser ( user : User, completion? : (res : string|Error) => void ) {

        try {

            if ( this.wallet === undefined) {
                if ( completion ){

                    completion(new Error("Wallet is undefined!!"));
                    return;
                }
            }
            

            let res = await this.wallet?.callMethod({
                contractId: this.contractId,
                method: 'signup_user',
                args: { first_name : user.first_name, last_name : user.last_name,
                email : user.email, mobile_number : user.mobile_number,
                profile_image : user.profile_image },
            });
            if ( completion ) {
                completion(res);
            }
        }
        catch ( e : any ) {
            if ( completion ) {
                completion(e);
            }
        }
    }

    async updateUser ( user : User, completion? : (res : string|Error) => void ) {

        try {

            if ( this.wallet === undefined) {
                if ( completion ){
                    completion(new Error("Wallet is undefined!!"));
                    return;
                }
            }
            
            let res = await this.wallet?.callMethod({
                contractId: this.contractId,
                method: 'update_user',
                args: { first_name : user.first_name, last_name : user.last_name,
                email : user.email, mobile_number : user.mobile_number,
                profile_image : user.profile_image },
            });
            if ( completion ) {
                completion(res);
            }
        }
        catch ( e : any ) {
            if ( completion ) {
                completion(e);
            }
        }
    }
  
    async createCollectionAndDeploy ( 
        collection : Collection,
        initBalanceInNear : number , 
        completion? : (res : string|Error) => void ) {

        try {

            if ( this.wallet === undefined) {
                if ( completion ){
                    completion(new Error("Wallet is undefined!!"));
                    return;
                }
            }


            let deposit = new BN(((initBalanceInNear * 1.02) * (10 ** NEAR_TOKEN_DECIMALS)).toLocaleString('fullwide', 
            {useGrouping:false}));

            let res = await this.wallet?.callMethod({
                contractId: this.contractId,
                method: 'create_collection_and_deploy',
                gas : "300000000000000", // max limit 
                deposit : deposit,
                args: { collection : collection },
            });
            if ( completion ) {
                completion(res);
            }
        }
        catch ( e : any ) {
            if ( completion ) {
                completion(e);
            }
        }
    }


    async ticketMint ( 
        collectionId : CollectionId, tokenId : string ,
        ticketImage : string,ticketType? : TicketType  
        , completion? : (res : string|Error) => void ) {

        try {

            if ( this.wallet === undefined) {
                if ( completion ){
                    completion(new Error("Wallet is undefined!!"));
                    return;
                }
            }
            
            let res = await this.wallet?.callMethod({
                contractId: this.contractId,
                method: 'ticket_mint',
                args: { collection_id : collectionId, token_id : tokenId,
                ticket_image : ticketImage, ticket_type : ticketType,
                extra : collectionIdToB64(collectionId),
                },
            });
            if ( completion ) {
                completion(res);
            }
        }
        catch ( e : any ) {
            if ( completion ) {
                completion(e);
            }
        }
    }
  
  
}