import { FC } from "react";
import { LogoMediaView } from "./LogoMediaView";
import { TemplateView } from "./TemplateView";
import { SalesTemplateSelect } from "./SalesTemplateSelect";
import { CollectionFormProps } from "./Form";


type Props = CollectionFormProps & {selectedRow? : number};


export const LogoAndTmplForm : FC <Props> = ({
    collection, setCollection, selectedRow
}) =>{

   
    const setImageDataCallback = (img? : string ) => {

        if ( setCollection ) {
            setCollection({...collection, icon : img});
        }
    }

    return <>
    <LogoMediaView setImageDataCallback={setImageDataCallback} imageData={collection?.icon} />
    <TemplateView collection={collection} index={selectedRow} setCollection={setCollection}/>
    <SalesTemplateSelect collection={collection} setCollection={setCollection}/>
    </>
}