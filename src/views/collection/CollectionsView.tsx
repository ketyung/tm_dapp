import { FC, useState } from "react";
import { Button, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { List } from "./List";
import { Form } from "./Form";
import { Collection } from "../../models";
import { ViewType } from "../View";


type Props = {

    setViewType? : (viewType : ViewType, param?: any ) => void,
}

export const CollectionsView : FC <Props> = ({
    setViewType
}) =>{

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
    title={isEditMode ? `Edit Event "${collectionForEdit?.title}"` : undefined}/>
    </Modal>


    return  <div>
    <div style={{textAlign:"right"}}><Button shape="round" 
    style={{minWidth:"200px",background:"#347",color:"white",
    marginRight:"10px",marginBottom:"50px"}}
    onClick={()=>{
        setModalVisible(true);
    }}>
        Create New Event
    </Button>
    </div>
    <h3 style={{textAlign:"left",fontWeight:"600"}}>Your Events</h3>
    <List setCollectionForEdit={openCollectionForEdit} toReloadList={toReloadList}
    setToReloadList={setToReloadList} setViewType={setViewType}/> 
    {modal}
</div>
}