import { Wallet } from "./Wallet";
import { Collection, CollectionId } from "../models";

export class CollectionsContract {

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

    async getCollection(collectionId : CollectionId ) : Promise<Collection|undefined>{

        try {

            console.log("this.wallet::", this.wallet, 
            collectionId, 
            new Date());

            let collection =  await this.wallet?.viewMethod({
                contractId: this.contractId,
                method: 'get_collection',
                args: { collection_id : collectionId }
            });

            return collection ;
        }
        catch( e: any) {
          
            console.error(e, new Date());
            return undefined;
        }
        
    } 

 
}