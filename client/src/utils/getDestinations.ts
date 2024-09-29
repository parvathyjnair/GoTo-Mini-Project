export default async function getDestinations() : Promise<string[]> {
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+"/travelDetails/destinations",{credentials: "include"});
        if(!response.ok){
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return [];
        }
        const data = await response.json();

        return data.map((destination:{id:number, name:string}) => destination.name);

    }catch(error){
        console.log(error);
        return [];
    }
}