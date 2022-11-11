const SHORTENER_URL = process.env.REACT_APP_SHORTENER_URL;

export const shorten = async (s : string) => {

    try {

        let r = await ((await fetch(`${SHORTENER_URL}sv/${s}`))).json();
        return r.v;    
    }
    catch(e : any) {     
        console.error("E@shorten", e, new Date());
    }
}

export const longUri = async (s : string) => {

    try {
        let r = await ((await fetch(`${SHORTENER_URL}lv/${s}`))).json();
        return r.v;    
    }
    catch(e : any){
        console.error("E@shorten", e, new Date());
    }
}
