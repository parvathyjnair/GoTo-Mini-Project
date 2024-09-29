export default async function getUserTrips(email: string) : Promise<{_id:string, destination:string, date:string, time:string, dir: boolean}[] | false> {
  try{
    let serverURL = process.env.REACT_APP_SERVER_URL;
    const response = await fetch(serverURL+`/travelDetails/userTrips/?email=${email}`,{
      credentials: "include"
    });
    if(!response.ok){
      return false;
    }
    const data = await response.json();
    localStorage.setItem("myTrips", JSON.stringify(data));
    return data;
  }catch(error){
    console.log(error);
    // window.alert("Error getting user trips");
    return false;
  }
}