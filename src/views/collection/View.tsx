import { FC, useState } from "react";
import { Button, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { List } from "./List";
import { SalesChartView } from "./SalesChartView";
import { MintsList } from "./MintsList";
import { Form } from "./Form";
import { Collection } from "../../models";

export const View : FC = () =>{

    const [modalVisible, setModalVisible] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    const [collectionForEdit, setCollectionForEdit] = useState<Collection>();

    const [toReloadList, setToReloadList] = useState(false);

    const openCollectionForEdit = (collection : Collection) => {

        setIsEditMode(true);
        setCollectionForEdit(collection);
        setModalVisible(true);
    }

    const closeModal = () =>{
        setModalVisible(false); 
        if(isEditMode) {
            setIsEditMode(false);
            setToReloadList(true);
        }
        setCollectionForEdit(undefined);
    }

    const modal = <Modal closeIcon={<CloseCircleOutlined className="CloseButton" />}
    className="FormModal" closable={true} 
    onCancel={() => {closeModal();}}
    destroyOnClose={true}
    footer={null}
    maskClosable={false}
    open={modalVisible}>
    <Form isEditMode={isEditMode} collectionForEdit={collectionForEdit}
    title={isEditMode ? `Edit Collection "${collectionForEdit?.title}"` : undefined}/>
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
        <SalesChartView/><br/>
        <h3 style={{textAlign:"left",fontWeight:"600"}}>Your Ticket Collections</h3>
        <List setCollectionForEdit={openCollectionForEdit} toReloadList={toReloadList}
        setToReloadList={setToReloadList}/>
        <br/><br/>
        <h3 style={{textAlign:"left",fontWeight:"600"}}>Recent Ticket Sales</h3>
        <MintsList />
        
        {modal}
    </div>
}