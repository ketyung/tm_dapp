import { FC } from "react";
import { Tabs } from "antd";
import { EventInfoForm } from "./EventInfoForm";
import { EventOtherInfoForm } from "./EventOtherInfoForm";
import { TicketInfoForm } from "./TicketInfoForm";
import { CollectionFormProps } from "./Form";

export type Props = CollectionFormProps & {
    setSelectedRowForPreview? : (index? : number) => void
};


export const EventTabbedForm : FC <Props> = ({
    collection, setCollection, setSelectedRowForPreview,isEditMode
}) =>{

    const items = [
        { label: "Event's Info", key: 't1', children: 
        <EventInfoForm collection={collection} setCollection={setCollection} isEditMode={isEditMode}/> }, // remember to pass the key prop
        { label: "Venue & date", key: 't2', 
        children:  <EventOtherInfoForm collection={collection} setCollection={setCollection} isEditMode={isEditMode}/> },
        { label: "Ticket's Info", key: 't3', children: 
        <TicketInfoForm collection={collection} setCollection={setCollection} isEditMode={isEditMode}
        setSelectedRowForPreview={setSelectedRowForPreview}/> },
    ];

    return <Tabs items={items} />;
}

