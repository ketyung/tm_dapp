import { FC, useState } from "react";
import { Button, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { List } from "./List";
import { Form } from "./Form";

export const View : FC = () =>{

    const [modalVisible, setModalVisible] = useState(false);

    const modal = <Modal closeIcon={<CloseCircleOutlined className="CloseButton" />}
    className="FormModal" closable={true}
    onCancel={() => {setModalVisible(false);}}
    destroyOnClose={true}
    footer={null}
    maskClosable={false}
    visible={modalVisible}>
    <Form/>
    </Modal>


    return <div>
        <div style={{textAlign:"right"}}><Button shape="round" 
        style={{minWidth:"200px",background:"#347",color:"white",
        marginRight:"10px",marginBottom:"50px"}}
        onClick={()=>{
            setModalVisible(true);
        }}>
            Create New Ticket Collection
        </Button>
        </div>
        <List/>
        {modal}
    </div>
}