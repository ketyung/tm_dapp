import { Collection } from "../../models";
import { Button, Image } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { FC } from "react";

type Props = {

    collection : Collection,

    index? : number,

}

export const ListRow : FC <Props> = ({
    collection, index,
}) =>{

    return <tr key={"row"+(index)}>
        <td style={{width:"5%"}}>
        {((index ?? 0)+1)}.
        </td>
        <td style={{width:"20%"}}>
        {collection.icon && <Image src={collection.icon} placeholder="Loading..."
        style={{width:"30px",height:"30px",borderRadius:"30px",marginRight:"4px"}}/>}
        {collection.title}
        </td>
        <td style={{width:"30%",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
        {collection.description}
        </td>
        <td style={{width:"10%"}}>
        {collection.total_tickets}
        </td>
        <td style={{width:"10%"}}>
        {collection.tickets_sold}
        </td>
        <td style={{width:"10%"}}>
        <Button shape="circle" icon={<MoreOutlined/>}></Button>
        </td>
    </tr>
}