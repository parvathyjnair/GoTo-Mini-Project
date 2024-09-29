export default async function updateTrip(tripId: string, date: string, time: string, destination: string, name: string, dir: boolean){
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        let res = await fetch(serverURL+`/travelDetails/trip/${tripId}`,{
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                date: date,
                time: time,
                destination: destination,
                dir: dir
            })
        });
        if(res.status === 200) return true;
        else{
            console.log(res);
            return false;
        }
    }catch(err){
        // window.alert("Error updating trip");
        console.log(err);
        return false;
    }
}