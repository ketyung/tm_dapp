import { useState } from "react";
import useWalletState from "./useWalletState";
import { Collection } from "../../../models";
import { CollectionsContract } from "../../../near/CollectionsContract";
import { COLLECTIONS_CONTRACT_ID } from "../../../near/const";

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

    return {getCollectionsOf, loading} as const;
}