import { Collection } from "../../models";
import { InfoForm } from "./InfoForm";
import { FC, useState } from "react";
import './css/Form.css';


export type CollectionFormProps = {

    collection : Collection

    setCollection? : (collection: Collection)=> void,
}


type Props = {

    title? : string, 
}

export const Form : FC <Props> = ({
    title
}) =>{

    const [collection, setCollection] = useState<Collection>({
        title : "", owner : "", symbol : "",
    });

    return <div className="CollectionForm">
        <h3> {title ?? "Create Your Ticket Collection"} </h3>
        <div className="formCol">
            <InfoForm setCollection={setCollection} collection={collection}/>
        </div>    
    </div>
}