const SHORTENER_URL = process.env.REACT_APP_SHORTENER_URL;

export const shorten = async (s : string) => {

    try {

        let r = await ((await fetch(`${SHORTENER_URL}sv/${encodeURIComponent(s)}`))).json();
        return r.v;    
    }
    catch(e : any) {     
        console.error("E@shorten", e.message, new Date());
    }
}

export const longUri = async (s : string) => {

    try {
        let r = await ((await fetch(`${SHORTENER_URL}lv/${encodeURIComponent(s)}`))).json();
        return r.v;    
    }
    catch(e : any){
        console.error("E@shorten", e, new Date());
    }
}
