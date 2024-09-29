import dateTimeInterface from "../types/dateTimeInterface";

export default async function getDateTime() : Promise<dateTimeInterface | boolean> {
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+"/getDateTime/"
        ,{
            credentials: 'include',
        }
        );
        if(!response.ok){
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return false;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
        return false;
    }
}