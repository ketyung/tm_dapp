import { Wallet } from "./Wallet";
import { Collection } from "../models";

export class TicketMintsContract {

    contractId? : string;

    wallet? : Wallet;

    constructor(contractId? : string , walletToUse?  : Wallet) {
        this.contractId = contractId;
        this.wallet = walletToUse;    
    }

    async getCollectionsOf(offset?: number, limit : number = 20 ) : Promise<Collection[]>{

        try {

            let collections =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_collections_of',
                args: { account_id:  this.wallet.accountId, offset : offset, limit : limit }
            });

            return collections ;
        }
        catch( e: any) {
          
            return [];
        }
        
    } 

 
}