import { FC } from "react";
import { LogoMediaView } from "./LogoMediaView";
import { TemplateView } from "./TemplateView";
import { CollectionFormProps } from "./Form";

export const LogoAndTmplForm : FC <CollectionFormProps> = ({
    collection, setCollection
}) =>{

    const setImageDataCallback = (img? : string ) => {

        if ( setCollection ) {
            setCollection({...collection, icon : img});
        }
    }

    return <>
    <LogoMediaView setImageDataCallback={setImageDataCallback} imageData={collection?.icon} />
    <TemplateView collection={collection}/>
    </>
}