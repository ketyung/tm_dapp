import { uploadImageToArweave } from "../../arweave";
import { FC , useState } from "react";
import { Message, MessageType } from "../../models";
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Spin, Checkbox} from 'antd';



type Props = {

    doNotShowOrigUploadList? : boolean,

    setImageDataUrlCallback? : (img? : string) => void, 

}

export const LogoUploadForm : FC <Props> = ( {doNotShowOrigUploadList, setImageDataUrlCallback }) =>{


    const [message, setMessage] = useState<Message>();

    const [withCropTool, setWithCropTool] = useState(false);

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
      
        let b = (isJpgOrPng && isLt2M);

        if ( b )
            setMessage(undefined);
        
        return b;
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
                setImageDataUri(undefined);
            }
            else {

                setMessage({text : "Success", type : MessageType.Info});
                setImageDataUrlNow(e);
                setImageDataUri(undefined);
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


    const uploader = <Upload maxCount={1} beforeUpload={checkIfFileValid}
    showUploadList={(doNotShowOrigUploadList !== undefined) ? !doNotShowOrigUploadList : true } 
    listType="picture" onChange={onChange} onRemove={onRemove}>  
     <Button shape="round" onClick={(e)=>{
        e.preventDefault(); setImageDataUri(undefined);
     }} style={{display:"inline",background:"#458",color:"white", width:"100px"}}>Browse</Button>
    </Upload>;

    return (<><div style={{display:"inline-block", float:"left", marginRight:"10px"}}>
    { withCropTool ? <ImgCrop rotate={true} fillColor="transparent">{uploader}</ImgCrop> : uploader}</div>
    { (imageDataUri !== undefined) && <Button shape="round" style={{display:"inline-block",marginLeft:"10px",
    width:"100px",background:"#375",color:"white"}} 
     onClick={async (e)=>{e.preventDefault();await uploadToArweaveNow();}}>
    {imageUploading ? <Spin size="small" style={{color:"white"}} /> : <><UploadOutlined 
    style={{marginRight:"4px"}}/>Upload</>}</Button>}
    <span style={{marginLeft:"20px",fontSize:"8pt"}}>
     Use crop tool <Checkbox checked={withCropTool} onChange={(e)=>{
        if (e.target.checked){
            setWithCropTool(true);
        }
        else {
            setWithCropTool(false);
        }
     }}/>   
    </span>
    {message && <div style={{padding:"10px",borderRadius:"10px",background:"#def", 
    color:message.type === MessageType.Error ? "red" : "#668", marginTop:"10px"}}>
    {message.text}
    </div>}
    </>);

}