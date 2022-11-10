import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    FacebookIcon, 
    FacebookMessengerIcon,
    TwitterIcon, 
    PinterestIcon, 
    TelegramIcon, 
    WhatsappIcon,    
    EmailIcon, 
    RedditIcon,
    LinkedinIcon,
} from "react-share" ;

import { Button } from 'antd';
import "./css/ShareView.css";

type Props = {

    uri? : string, 

    quote? : string, 

    hashtag? : string, 

}


export const ShareView   : React.FC<Props> = ({uri, quote, hashtag}) =>{

    const shareUrl = (uri?.startsWith("http://") || uri?.startsWith("https://"))
    ? uri : window.location.protocol + "//" + window.location.host + uri;


    const [copied, setCopied] = React.useState(false);

    function copyURL() {
        let url = shareUrl ?? "";
         
        if (navigator.clipboard){

            navigator.clipboard.writeText(url).then(()=>{
                setCopied(true);

                setTimeout(()=>{
                    setCopied(false);
                }, 5000);     
            });
        }    
     }

    return <div className="ShareView">

        {shareUrl && <>
        <TwitterShareButton  url={shareUrl} className="shareIcon">
             <TwitterIcon size={46} />
        </TwitterShareButton>
       
        <TelegramShareButton  url={shareUrl} className="shareIcon">
             <TelegramIcon size={46} />
        </TelegramShareButton>
       
        <WhatsappShareButton  url={shareUrl} className="shareIcon">
             <WhatsappIcon size={46} />
        </WhatsappShareButton>

        <br/>
        <FacebookShareButton  url={shareUrl}  
        quote={quote} hashtag={hashtag} className="shareIcon">
             <FacebookIcon size={46} />
        </FacebookShareButton>

        <FacebookMessengerShareButton appId={"none"} url={shareUrl} className="shareIcon">
             <FacebookMessengerIcon size={46} />
        </FacebookMessengerShareButton>
       
        <PinterestShareButton  url={shareUrl} media="" description={quote} className="shareIcon">
             <PinterestIcon size={46} />
        </PinterestShareButton>

        <br/>

        <RedditShareButton  url={shareUrl}  className="shareIcon">
             <RedditIcon size={46} />
        </RedditShareButton>

        <LinkedinShareButton  url={shareUrl}  className="shareIcon">
             <LinkedinIcon size={46} />
        </LinkedinShareButton>

        <EmailShareButton  url={shareUrl}  className="shareIcon">
             <EmailIcon size={46} />
        </EmailShareButton>

        <br/>

        <Button style={{margin: "10px 10px 10px 20px", padding:"4px", minWidth:"150px",borderRadius:"20px"}}
          onClick={async ()=> {copyURL();}}>{copied ? "Copied" : "Copy Link"}</Button>
        </>}

    </div>

}