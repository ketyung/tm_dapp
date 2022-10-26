import { FormInput } from "../components/FormInput";
import { FormTextArea } from "../components/FormTextArea";
import { Collection } from "../../models";
import { acronym } from "../../utils";
import { FC, useState } from "react";
import './css/Form.css';

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
        <table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr>
                    <td valign="top" align="center" colSpan={2}>
                       {title ?? "Create Your Ticket Collection"} 
                    </td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td valign="top" style={{width:"50%"}}>
                    <FormInput label="Title" style={{minWidth:"220px"}} 
                    value={collection.title}
                    onChange={(e)=>{
                        let title = e.target.value
                        let a = acronym(title);
                        if ( a )
                            setCollection({...collection, symbol: a, title: title });
                        else 
                            setCollection({...collection, title: title});
                        
                    }}
                        
                    />
                    </td>
                    <td valign="top" style={{width:"50%"}}>
                    <FormInput label="Symbol" style={{maxWidth:"100px"}} readOnly={true} value={collection?.symbol ?? ""}/>
                    </td>
                </tr>
                <tr>
                    <td valign="top" colSpan={2} style={{width:"100%"}}>
                    <FormTextArea style={{width:"600px"}} rows={3} 
                    minRows={2} maxRows={5}
                    label="Description" 
                    value={collection.description} onChange={(e)=>{
                        setCollection({...collection, description : e.currentTarget.value})
                    }}/>
                    </td>
                </tr>

            </tbody>

        </table>

    </div>
}