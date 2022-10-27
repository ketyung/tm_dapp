import * as nearApiJs from 'near-api-js';


export function nearTimestampToDateString(t : number) :string {

    let d = formatDate(new Date((t/1000000)));

    return d;
}

export function formatDate(date : Date) {
    let hours : number |string = date.getHours();
    let minutes : number|string = date.getMinutes();
    let secs : number|string = date.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' +minutes : minutes;
    secs = secs < 10 ? '0' + secs : secs;
    
    let strTime = hours + ':' + minutes + ':' + secs;

    let mon : number|string = date.getMonth()+1;
    mon = mon < 10 ? '0' + mon : mon;

    let day : number|string = date.getDate();
    day = day < 10 ? '0' + day : day;
    
    return  date.getFullYear() + "-" + mon + "-" + day + " " + strTime;
}


export function timeSince(date? : Date, short? : boolean ) : string | undefined {

	if ( date ){

		let now = new Date(); 

		let seconds : number = Math.floor((now.getTime() - date.getTime()) / 1000);
	  
		let interval : number = seconds / 31536000;
	  
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "Y" : " year" + ((interval >= 2) ? "s" : ""));
		}
		
        interval = seconds / 2592000;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "M" : " month" + ((interval >= 2) ? "s" : ""))
		}

		interval = seconds / 86400;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "D" : " day" + ((interval >= 2) ? "s" : ""));
		}
		interval = seconds / 3600;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "H" : " hour" + ((interval >= 2) ? "s" : ""));
		}

		interval = seconds / 60;
		if (interval > 1) {
		    return Math.floor(interval) + (short ? "m" : " minute" + ((interval >= 2) ? "s" : ""));
		}
		
        return Math.floor(seconds) + (short ? "s" : " second" + ((interval >= 2) ? "s" : ""));
	
	}
}


export function dateToTimeAgo(date?: Date): {short? : string, long? : string} {
	
	if ( date === undefined) return {short:"", long:""};

	let timeAgo = timeSince(date, true);
	let timeAgoLong = timeSince(date);
	
	return { short : timeAgo , long : timeAgoLong + " ago"};

}

export function nearTimestampToDateAgo(t : number) : {short? : string, long? : string} {

    let d = dateToTimeAgo(new Date((t/1000000)));

    return d;
}


export function acronym ( str : string ) : string | undefined {

	let matches = str.match(/\b(\w)/g); 

	if (matches !== null) {

		let acronym = matches.join(''); 
		return acronym;
	}
	
}

export const yoctoToNear = ( amount : string, decimalsCount? : number ) =>{

	if (decimalsCount) {
		let v = nearApiJs.utils.format.formatNearAmount(amount);
		return parseFloat(v).toFixed(decimalsCount);
	}
	return nearApiJs.utils.format.formatNearAmount(amount);
}

export const nearTimestampToDate = ( ts : number) : Date =>{

	return new Date(ts/1000_000);
}