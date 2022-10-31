import { Collection } from "../../models";
import { FC, useEffect, useState, useCallback } from "react";
import useCollectionsContract from "../../utils/sm/hooks/useCollectionsContract";



type Props = {
    id?: string, 
}

export const CollectionSalesView : FC <Props> = ({id}) =>{

    const [collection, setCollection] = useState<Collection>();

    const {getCollection, b64ToCollectionId} = useCollectionsContract();

    const fetchCollection = useCallback(async ()=>{
        if ( id ) {
            let collectionId = b64ToCollectionId(id);
            let c = await getCollection(collectionId);
            setCollection(c);
            //console.log("coll.id::", collectionId,c, new Date());
        }
    },[id]);

    useEffect(()=>{
       
        fetchCollection();
       
    },[fetchCollection]);

    return <>
    <p>{collection?.title} ({collection?.symbol})</p>
    </>
}