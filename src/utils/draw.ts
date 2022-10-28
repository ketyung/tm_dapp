interface Radius {

    tl : number,

    tr : number,

    bl : number,

    br : number, 
}

export const roundRect = (ctx : CanvasRenderingContext2D, x : 
    number, y : number, w : number, h : number, r : number )  =>{
    
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y,   x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x,   y+h, r);
    ctx.arcTo(x,   y+h, x,   y,   r);
    ctx.arcTo(x,   y,   x+w, y,   r);
    ctx.closePath();
    return ctx;
}


export const roundRect2 = (ctx : CanvasRenderingContext2D,
    x : number ,
    y : number ,
    width : number ,
    height : number ,
    radius: number|Radius  = 20,
    fill : boolean = false,
    stroke : boolean = true
  ) => {
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } 
    else {
      radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
}

export const loadImage = async ( imgSrc : string ) : Promise<HTMLImageElement|undefined> =>{
        
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.crossOrigin ="anonymous";
        img.onload = () => { resolve(img); }
        img.onerror = reject
        img.src = imgSrc
    })

}


export const loadCustomFont = async () => {

    await loadFont("Lato-Black","");
}


export async function loadFont(fontFamily: string, url: string): Promise<void> {
    const font = new FontFace(fontFamily, `local(${fontFamily}), url(${url})`);
    // wait for font to be loaded
    await font.load();
    // add font to document
    document.fonts.add(font);
}