import { useState } from "react";
import useWalletState from "./useWalletState";
import { Collection, CollectionId } from "../../../models";
import { CollectionsContract } from "../../../near/CollectionsContract";
import { COLLECTIONS_CONTRACT_ID } from "../../../near/const";
import { collectionIdToHex as colIdToHex } from "../..";

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


    const collectionIdToHex = (collection? : Collection) =>{

        return colIdToHex( {title : collection?.title ?? "",
        owner : wallet.accountId, 
        symbol :collection?.symbol ?? ""});
    }


    return {getCollectionsOf, loading, getCollection, collectionIdToHex} as const;
}