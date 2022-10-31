import { Collection } from "../../models";
import { hexToCollectionId } from "../../utils";
import { FC, useEffect, useState, useCallback } from "react";
import useCollectionsContract from "../../utils/sm/hooks/useCollectionsContract";



type Props = {
    id?: string, 
}

export const CollectionSalesView : FC <Props> = ({id}) =>{

    const [collection, setCollection] = useState<Collection>();

    const {getCollection} = useCollectionsContract();

    const fetchCollection = useCallback(async ()=>{
        if ( id ) {
            let collectionId = hexToCollectionId(id);
            let c = await getCollection(collectionId);
            setCollection(c);
        }
    },[id]);

    useEffect(()=>{
       
        fetchCollection();
       
    },[fetchCollection]);

    return <>
    <p>{collection?.title} ({collection?.symbol})</p>
    </>
}