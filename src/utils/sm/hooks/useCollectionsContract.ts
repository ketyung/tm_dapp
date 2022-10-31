import { useState } from "react";
import useWalletState from "./useWalletState";
import { Collection, CollectionId } from "../../../models";
import { CollectionsContract } from "../../../near/CollectionsContract";
import { COLLECTIONS_CONTRACT_ID } from "../../../near/const";
import { collectionIdToB64 as colIdToB64, b64ToCollectionId as b64ToColId } from "../..";

export default function useCollectionsContract() {

    const [loading, setLoading] = useState(false);

    const {wallet}  = useWalletState();
    

    const getCollectionsOf = async (offset : number, limit: number = 20) : Promise<Collection[]>=> {
        setLoading(true);

        let contract = new CollectionsContract (COLLECTIONS_CONTRACT_ID, wallet);

        let colls =  await contract.getCollectionsOf(offset, limit);
        setLoading(false);
        return colls;
    } 

    const  getCollection = async (collectionId : CollectionId ) : Promise<Collection|undefined> => {

        setLoading(true);
        let contract = new CollectionsContract (COLLECTIONS_CONTRACT_ID, wallet);

        let coll =  await contract.getCollection(collectionId);
        setLoading(false);
        return coll;
    }


    const collectionIdToB64 = (collection? : Collection) =>{

        return colIdToB64( {title : collection?.title ?? "",
        owner : wallet.accountId, 
        symbol :collection?.symbol ?? ""});
    }


    const b64ToCollectionId = ( b64str : string ) : CollectionId => {

        return b64ToColId(b64str);

    }

    return {getCollectionsOf, loading, getCollection, collectionIdToB64, b64ToCollectionId} as const;
}