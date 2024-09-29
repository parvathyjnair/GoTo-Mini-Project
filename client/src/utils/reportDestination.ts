export default async function reportDestination(destination: string, email: string) : Promise<string> {
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+"/travelDetails/destinations/report", {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reportedDestination: destination, email: email})
        });
        // send the msg to the client
        const data = await response.json();
        // console.log(data);
        return data.msg;

    }catch(error){
        console.log(error);
        return "Something went wrong.";
    }
}