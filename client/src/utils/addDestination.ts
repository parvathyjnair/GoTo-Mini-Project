export default async function addDestination(destination: string) : Promise<boolean> {
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+"/travelDetails/destinations", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({destname: destination})
        });
        if(!response.ok){
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return false;
        }
        return true;

    }catch(error){
        console.log(error);
        return false;
    }
}