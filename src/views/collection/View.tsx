import { FC } from "react";
import { Button } from "antd";
import { List } from "./List";

export const View : FC = () =>{

    return <div>
        <div style={{textAlign:"right"}}><Button shape="round" style={{
        minWidth:"200px",background:"#347",color:"white",
        marginRight:"10px",marginBottom:"50px"}}>
            Create New Ticket Collection
        </Button>
        </div>
        <List/>
    </div>
}