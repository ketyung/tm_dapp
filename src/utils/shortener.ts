const SHORTENER_URL = "http://localhost:3333/";

export const shorten = async (s : string) => {

    let r = await ((await fetch(`${SHORTENER_URL}sv/${s}`))).json();
    return r.v;
}

export const longUri = async (s : string) => {

    let r = await ((await fetch(`${SHORTENER_URL}lv/${s}`))).json();
    return r.v;
}
