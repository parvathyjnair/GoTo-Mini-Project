// import travelDetails_interface from "../types/travelDetailsInterface";
import travelDetailsPOST_interface from "../types/travelDetailsPOSTInterface";

export default async function addTravelDetail(travelDetail : travelDetailsPOST_interface) : Promise<boolean>{
    try{
    let serverURL = process.env.REACT_APP_SERVER_URL;
    await fetch(serverURL+'/travelDetails', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travelDetail)
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}