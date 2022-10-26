import { FormInput } from "../components/FormInput";
import { FormTextArea } from "../components/FormTextArea";
import { Collection } from "../../models";
import { acronym } from "../../utils";
import { FC, useState } from "react";


type Props = {

    title? : string, 
}

export const Form : FC <Props> = ({
    title
}) =>{

    const [collection, setCollection] = useState<Collection>({
        title : "", owner : "", symbol : "",
    });

    return <div>
        <table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr>
                    <td align="center" colSpan={2}>
                       {title ?? "Create Your Ticket Collection"} 
                    </td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td style={{width:"50%"}}>
                    <FormInput label="Title" style={{maxWidth:"220px"}} value={collection?.title}
                    onChange={(e)=>{
                        setCollection({...collection, title: e.target.value});
                        let a = acronym(e.target.value);
                        if ( a )
                            setCollection({...collection, symbol: a});
                        }}
                    />
                    </td>
                    <td style={{width:"50%"}}>
                    <FormInput label="Symbol" style={{maxWidth:"100px"}} readOnly={true} value={collection?.symbol}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{width:"100%"}}>
                    <FormTextArea style={{width:"300px"}} rows={3} value={collection.description} onChange={(e)=>{
                        setCollection({...collection, description : e.currentTarget.value})
                    }}/>
                    </td>
                </tr>

            </tbody>

        </table>

    </div>
}