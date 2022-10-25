import { Wallet } from "./Wallet";
import { User } from "../models";
import { NEAR_TOKEN_DECIMALS } from "./const";
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

            return await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'has_user',
                args: { user_id:  this.wallet.accountId}
            });
        }
        catch( e: any) {
            //console.log("err@hasUser@", e, new Date());
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
  
    async createAndDeployNftContract ( subAccountId : string ,
        initBalanceInNear : number , 
        param? : {name : string, symbol : string, icon? : string, base_uri? : string },
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
                method: 'create_and_deploy_nft_contract',
                gas : "300000000000000", // max limit 
                deposit : deposit,
                args: { sub_account_id : subAccountId, init_balance : initBalanceInNear,
                /* code : new Uint8Array(buf), */
                param : param },
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