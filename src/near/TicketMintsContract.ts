import { Wallet } from "./Wallet";
import { TicketMint, CollectionId } from "../models";

export class TicketMintsContract {

    contractId? : string;

    wallet? : Wallet;

    constructor(contractId? : string , walletToUse?  : Wallet) {
        this.contractId = contractId;
        this.wallet = walletToUse;    
    }

    async getTicketMintsOf(title : string, symbol : string, 
        offset?: number, limit : number = 20 ) : Promise<TicketMint[]>{

        try {

            let collection_id : CollectionId ={
                title : title,
                symbol : symbol,
                owner : this.wallet?.accountId,
            };

            let mints =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_ticket_mints_of',
                args: { collection_id : collection_id, offset : offset, limit : limit }
            });

            return mints ;
        }
        catch( e: any) {
          
            return [];
        }
        
    } 

 
    async getTicketMintsBy( offset?: number, limit : number = 20 ) : Promise<TicketMint[]>{

        try {

            let accountId = this.wallet?.accountId;

            let mints =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_ticket_mints_by',
                args: { owner : accountId, offset : offset, limit : limit }
            });

            return mints ;
        }
        catch( e: any) {
          
            console.error("ex", e, new Date());
            return [];
        }
        
    } 

}