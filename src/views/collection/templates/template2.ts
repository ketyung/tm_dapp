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
        grd.addColorStop(0, "#b00");
        grd.addColorStop(1, "#980");

        ctx.fillStyle = grd;
        ctx.fill();
    
        // Draw the text
        ctx.font = "24px Turismo";
        ctx.fillStyle = "wheat";
        ctx.fillText(ticketInfo.title ?? "No Title", 40, 70);

        const txtXStart = 40;

        let txtYStart = 200;

        if ( ticketInfo.venue ) {

            ctx.font = "11px Turismo";
            ctx.fillStyle = "#fff";
            
            ctx.fillText(`Venue: ${ticketInfo.venue}`, txtXStart, txtYStart );
        }
       

        txtYStart += 24;

        if ( ticketInfo.startDate ) {

            ctx.font = "11px Turismo";
            ctx.fillStyle = "#fff";
            
            ctx.fillText(`Start: ${ticketInfo.startDate}`, txtXStart, txtYStart  );
        }


        txtYStart += 24;

        if ( ticketInfo.endDate ) {

            ctx.font = "11px Turismo";
            ctx.fillStyle = "#fff";
            
            ctx.fillText(`End:  ${ticketInfo.endDate}`, txtXStart, txtYStart );
        }


        if ( ticketInfo.imageSrc ) {

            let img = await loadImage(ticketInfo.imageSrc);
            if ( img ) {
      
                roundRect2(ctx, 320, 90,240, 240, 110) ;
                ctx.fillStyle = "#950";
                ctx.strokeStyle = "#900";
                ctx.fill();
            
                drawImageRounded(ctx, img, 340, 110, 200, 200, 100);   
      
            }
        }


        if ( ticketInfo.ticketNo ) {

            roundRect2(ctx, txtXStart, 120,240, 45, 20) ;
            ctx.fillStyle = ticketInfo.ticketType?.color_code ?? "#000";
            ctx.fill();
        
            ctx.font = "28px Turismo";
            ctx.fillStyle = "white";
            
            ctx.fillText(ticketInfo.ticketNo, txtXStart + 20, 154 );
      
        }

        ctx.strokeStyle = "#700";
               
        roundRect2(ctx, txtXStart + 30, 280, 60, 25, 12) ;
        ctx.fillStyle = "#700";
        ctx.fill();
    
        roundRect2(ctx, txtXStart + 110, 280, 60, 25, 12) ;
        ctx.fillStyle = "#700";
        ctx.fill();
       
        ctx.strokeStyle = "#960";
               
        roundRect2(ctx, txtXStart + 70, 300, 60, 25, 12) ;
        ctx.fillStyle = "#960";
        ctx.fill();
    
        
        let imgData = canvas.toDataURL('image/png');

        return imgData;
    }
}