import { Collection } from "../../models";
import { Button, Image, Menu, Dropdown} from "antd";
import { MoreOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { FC } from "react";

type Props = {

    collection : Collection,

    index? : number,

}

export const ListRow : FC <Props> = ({
    collection, index,
}) =>{

    const menu = (<Menu
        items={[
        {
            label: <div className="menuItem" onClick={()=>{
    
            }}><EditOutlined style={{marginRight:"10px"}}/>Edit</div>,
            key: '0',
        },
        {
            label: <div className="menuItem" onClick={()=>{
    
            }}><EyeOutlined style={{marginRight:"10px"}}/>Ticket Sales</div>,
            key: '1',
        },
      
        ]}
    />
    );

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
        <td style={{width:"10%"}}><Dropdown overlay={menu} trigger={['click']}>
        <Button shape="circle" onClick={(e)=>{
            e.preventDefault();
        }}><MoreOutlined/></Button>
        </Dropdown>
        </td>
    </tr>
}