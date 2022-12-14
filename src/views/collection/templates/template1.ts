import { TicketInfo } from "../../../models";
import { roundRect2, loadImage, drawImageRounded } from "../../../utils/draw";

export const createImageDataUrl = async (
    ticketInfo : TicketInfo 
) : Promise<string|undefined> => {


    const canvas = document.createElement("canvas");

    let ctx = canvas.getContext("2d");

    if ( ctx !== null ) {

        ctx.canvas.width = 600;
        ctx.canvas.height = 360;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the background
        roundRect2(ctx, 25, 20,550, 320, 30) ;

        let grd = ctx.createLinearGradient(0, 0, 360, 0);
        grd.addColorStop(0, "#293");
        grd.addColorStop(1, "#306");

        ctx.fillStyle = grd;
        ctx.fill();
    
        // Draw the text
        ctx.font = "30px Raleway";
        ctx.fillStyle = "ghostwhite";
        ctx.fillText(ticketInfo.title ?? "No Title", 40, 70);

        const txtXStart = 260;

        let txtYStart = 200;

        if ( ticketInfo.venue ) {

            ctx.font = "19px Raleway";
            ctx.fillStyle = "#ffa";
            
            ctx.fillText(`Venue: ${ticketInfo.venue}`, txtXStart, txtYStart );
        }
       

        txtYStart += 24;

        if ( ticketInfo.startDate ) {

            ctx.font = "19px Raleway";
            ctx.fillStyle = "#ffa";
            
            ctx.fillText(`Start: ${ticketInfo.startDate}`, txtXStart, txtYStart  );
        }


        txtYStart += 24;

        if ( ticketInfo.endDate ) {

            ctx.font = "19px Raleway";
            ctx.fillStyle = "#ffa";
            
            ctx.fillText(`End:  ${ticketInfo.endDate}`, txtXStart, txtYStart );
        }


        if ( ticketInfo.imageSrc ) {

            let img = await loadImage(ticketInfo.imageSrc);
            if ( img )
                drawImageRounded(ctx, img, 40, 110, 200, 200, 30);   
            // ctx.drawImage(img, 40, 110, 200, 200);
    
        }


        if ( ticketInfo.ticketNo ) {

            roundRect2(ctx, txtXStart, 120,200, 45, 16) ;
            ctx.fillStyle = ticketInfo.ticketType?.color_code ?? "#700";
            ctx.fill();
        
            ctx.font = "32px Raleway";
            ctx.fillStyle = "white";
            
            ctx.fillText(ticketInfo.ticketNo, txtXStart + 20, 154 );
      
        }
       
        let imgData = canvas.toDataURL('image/png');

        return imgData;
    }
}