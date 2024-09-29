import travelDetails_interface from "../types/travelDetailsInterface";

const findCompanions = async (
  destination: string,
  date: string,
  email: string,
  name: string,
  time: string,
  dir: string
): Promise<travelDetails_interface[] | false> => {
  try {
    let serverURL = process.env.REACT_APP_SERVER_URL;
    const response = await fetch(
      serverURL+"/travelDetails/?" +
        new URLSearchParams({
          destination: destination,
          date: date,
          email: email,
          name: name,
          time: time,
          dir: dir
        }),
      {
        credentials: "include"
      }
    );

    if (!response.ok) {
      // const message = `An error occurred: ${response.statusText}`;
      // window.alert(message);
      return false;
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export default findCompanions;
