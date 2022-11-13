import { Collection, ShortCorrectionInfo } from "../../models";
import { FC, useEffect, useState, useCallback } from "react";
import { Template1 } from "./templates/Template1";
import { Template2 } from "./templates/Template2";
import { GSpinner } from "../components/GSpinner";
import * as shortener from "../../utils/shortener";
import useCollectionsContract from "../../hooks/useCollectionsContract";
import useWalletState from "../../hooks/useWalletState";


type Props = {
    
    id?: string, 

    urlNotShorten? : boolean,

    previewTemplateId? : string,

}

export const CollectionSalesView : FC <Props> = ({id, previewTemplateId, urlNotShorten}) =>{

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

    const getShortCollectionInfo = async () =>{

        if ( id ) {
            let s = urlNotShorten ? id : await shortener.longUri(id);
            let collInfo = b64ToShortCollectionInfo(s);
            setShortCollectionInfo(collInfo);

            return collInfo;
        }
        
    }

    useEffect(()=>{
        setLoading(true);
        getShortCollectionInfo().then((collInfo)=>{
        
            checkIfSignedIn(collInfo);
        })
        .catch(e=>{
            console.error("Failed to convert from short to long",e, new Date());
            setLoading(false);
        })
    },[]);

   
    const switchView = () =>{
        
        if (shortCollectionInfo) {    

            let templateId = previewTemplateId ?? (shortCollectionInfo?.templateId ?? 0);
   
            switch(+templateId) {

                case 1 :
                    return <Template1 shortCollectionInfo={shortCollectionInfo}
                    collection={collection} hasSignedIn={hasSignedIn}/>
                case 2 :
                    return <Template2 shortCollectionInfo={shortCollectionInfo}
                    collection={collection} hasSignedIn={hasSignedIn}/>
                    
                default :

                    return <GSpinner text="Loading..." style={{margin:"auto",marginTop:"100px"}}/>

            }
        }
    }

    return <>
    {loading ? <GSpinner text="Loading..." style={{margin:"auto",marginTop:"100px"}}/> : switchView()}
    </>
}