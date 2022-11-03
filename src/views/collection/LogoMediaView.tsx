import { FC } from "react";
import { Image} from "antd";
import { LogoUploadForm } from "./LogoUploadForm";
import imagePlaceHolder from '../../images/picture.png';


type Props = {

    imageData? : string,

    setImageDataCallback? : (img? : string) => void, 

    showUploadedImage? : boolean,
}


export const LogoMediaView : FC <Props> = ({
    imageData,setImageDataCallback, showUploadedImage,
}) =>{
   
    const imageView = imageData && 
    <Image src={imageData} placeholder={imagePlaceHolder}
    style={{width:"40px",height:"40px",marginRight:"4px",borderRadius:"50px"}} />

    return <div className="LogoMediaView"> 
    <h4>Upload Logo</h4>
    {showUploadedImage && <div style={{display:"inline-block"}}>{ imageView }</div>}
    <LogoUploadForm setImageDataUrlCallback={setImageDataCallback} doNotShowOrigUploadList={true}/>
    </div>
}