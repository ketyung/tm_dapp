import { FC } from "react";
import { CollectionFormProps } from "./Form";
import { TicketTemplateSelect } from "./TicketTemplateSelect";


export const TicketTemplatesView : FC <CollectionFormProps> = ({
    collection, setCollection
}) =>{

    return <div className="TicketTemplatesView">
        <TicketTemplateSelect collection={collection} setCollection={setCollection} template={1} name="Aurora"/>
        <TicketTemplateSelect collection={collection} setCollection={setCollection} template={2} name="Fire"/>
    </div>
}