import { Wallet } from "./Wallet";
import { TicketMint, CollectionId, BuyerResult } from "../models";

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

    async getTicketMintsCount( dateStart?: number, dateEnd? : number) : Promise<number>{

        try {

            let accountId = this.wallet?.accountId;

            let cnt =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_ticket_mints_count',
                args: { owner : accountId, date_start : dateStart, 
                    date_end : dateEnd }
            });

            return cnt ;
        }
        catch( e: any) {
          
            console.error("ex", e, new Date());
            return 0;
        }
        
    } 


    async getTicketMintsCountFor( dateRanges : {
        start_date_timestamp?: number, end_date_timestamp? : number, date? : string,
    }[]) : Promise<{date? : string, count : number}[]>{

        try {

            let accountId = this.wallet?.accountId;

            let res =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_ticket_mints_count_for',
                args: { owner : accountId, date_ranges : dateRanges }
            });

            return res ;
        }
        catch( e: any) {
          
            console.error("ex", e, new Date());
            return [];
        }
        
    } 


    async getTicketsBuyers( offset? : number, limit : number = 10) : Promise<BuyerResult>{

        try {

            let accountId = this.wallet?.accountId;

            let res =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_tickets_buyers',
                args: { owner : accountId, offset: offset, limit : limit  }
            });

            return res ;
        }
        catch( e: any) {
          
            console.error("ex", e, new Date());
            return {};
        }
        
    } 

}