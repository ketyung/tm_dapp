import { Collection, ShortCorrectionInfo } from "../../models";
import { FC, useEffect, useState, useCallback } from "react";
import { Template1 } from "./templates/Template1";
import { GSpinner } from "../components/GSpinner";
import useCollectionsContract from "../../hooks/useCollectionsContract";
import useWalletState from "../../hooks/useWalletState";


type Props = {
    id?: string, 
}

export const CollectionSalesView : FC <Props> = ({id}) =>{

    const {isSignedIn, dateUpdated} = useWalletState();

    const [shortCollectionInfo, setShortCollectionInfo] = useState<ShortCorrectionInfo>();
   
    const [loading,setLoading] = useState(false);

    const [hasSignedIn, setHasSignedIn] = useState(false);

    const checkIfSignedIn =  useCallback(async (collInfo? : ShortCorrectionInfo)=>{
   
        setLoading(true);
     
        if ( await isSignedIn()) {
            setHasSignedIn(true);
            fetchCollection(collInfo);
        }
        else {
            setHasSignedIn(false);
        }

        setLoading(false);

    },[dateUpdated,isSignedIn]);


    const [collection, setCollection] = useState<Collection>();

    const {getCollection, b64ToShortCollectionInfo} = useCollectionsContract();

    const fetchCollection = useCallback(async (collInfo? : ShortCorrectionInfo)=>{
        if (collInfo ) {
            let c = await getCollection(collInfo.collectionId);
            setCollection(c);
        }
    },[id]);

    const getShortCollectionInfo = () =>{

        if ( id ) {
            let collInfo = b64ToShortCollectionInfo(id);
            setShortCollectionInfo(collInfo);
            return collInfo;
        }
    }

    useEffect(()=>{
        let collInfo = getShortCollectionInfo();
        checkIfSignedIn(collInfo);
    },[]);


    const switchView = () =>{

        if (shortCollectionInfo) {

            switch(+(shortCollectionInfo.templateId ?? 0)) {

                case 1 :
                    return <Template1 shortCollectionInfo={shortCollectionInfo}
                    collection={collection} hasSignedIn={hasSignedIn}/>

                default :

                    return <GSpinner text="Loading..." style={{margin:"auto",marginTop:"30px"}}/>

            }
        }
    }

    return <>
    {loading ? <GSpinner text="Loading..." style={{margin:"auto",marginTop:"30px"}}/> : switchView()}
    </>
}