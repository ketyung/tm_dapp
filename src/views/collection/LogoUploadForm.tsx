import { uploadImageToArweave } from "../../arweave";
import { FC , useState } from "react";
import { Message, MessageType } from "../../models";
import { FileImageOutlined, UploadOutlined } from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';
import { Upload, Button, Spin} from 'antd';



type Props = {

    doNotShowOrigUploadList? : boolean,

    setImageDataUrlCallback? : (img? : string) => void, 

}

export const LogoUploadForm : FC <Props> = ( {doNotShowOrigUploadList, setImageDataUrlCallback }) =>{


    const [message, setMessage] = useState<Message>();

    const [imageDataUri, setImageDataUri] = useState<string>();

    const [imageUploading, setImageUploading] = useState(false);

    const [contentType, setContentType] = useState('image/png');
    

    const checkIfFileValid = (file : any ) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      
        if (!isJpgOrPng) {
           setMessage({ text :'You can only upload JPG/PNG file!', type : MessageType.Error});
        }
      
        const isLt2M = (file.size / 1024 / 1024) < 2;
      
        if (!isLt2M) {
            setMessage({ text : 'Image must be smaller than 2MB!', type : MessageType.Error});
        }
      
        return isJpgOrPng && isLt2M;
    };

  

    const handleImageDataUrl = async  (info : any ) =>{

        let file = info.file;

        let src = file.url;

        setContentType(file.type);
            
        if (!src && file.originFileObj) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();

            reader.readAsDataURL(file.originFileObj);

            reader.onload = () => { 
                if ( reader.result !== null && typeof reader.result === 'string' ) {
                    resolve(reader.result);
                }   
            };
        
          });
        }
    
        if ( src ) {
            setImageDataUri(src);   
        }
    }


    const uploadToArweaveNow = async () =>{

        setMessage(undefined);
        setImageUploading(true);
        if ( imageDataUri === undefined) {

            setMessage({ text : "No image data", type:MessageType.Error });
            setImageUploading(false);
            return;
        }

        await uploadImageToArweave(imageDataUri,contentType, (e)=>{

            if ( e instanceof Error) {

                setMessage({ text :e.message, type: MessageType.Error});
            }
            else {

                setMessage({text : "Success", type : MessageType.Info});
                setImageDataUrlNow(e);
            }

            setImageUploading(false);

        });
       
        
    }


    const onChange = async (info : any) =>{
        await handleImageDataUrl(info);
    }

    const setImageDataUrlNow = (img? : string) =>{

        if ( setImageDataUrlCallback )
            setImageDataUrlCallback(img);
    }

    const onRemove = () =>{
        setImageDataUrlNow(undefined);
    }

    return (<><div style={{display:"inline-block", float:"left", marginRight:"10px"}}>
    <ImgCrop rotate={true}><Upload  maxCount={1} beforeUpload={checkIfFileValid}
    showUploadList={!doNotShowOrigUploadList} listType="text" onChange={onChange} onRemove={onRemove}>  
     <Button shape="round" style={{display:"inline"}} icon={<FileImageOutlined />}></Button>
    </Upload></ImgCrop></div>
    <Button shape="round" disabled={(imageDataUri === undefined)} 
     style={{display:"inline-block",marginLeft:"10px"}} onClick={async (e)=>{
        e.preventDefault();
        await uploadToArweaveNow();
     }}>{imageUploading ? <Spin size="small" style={{background:"#333", 
     padding:"2px", borderRadius:"180px"}}/> : <UploadOutlined />}</Button>
    {message && <div style={{padding:"10px",borderRadius:"10px",background:"#def", 
    color:message.type === MessageType.Error ? "red" : "#668", marginTop:"10px"}}>
    {message.text}
    </div>}
    </>);

}