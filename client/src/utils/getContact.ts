export default async function getContact(email:string) : Promise<boolean | {ph_no:string, wa_no:string}> {
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(serverURL+"/userDetails/getContact/?"+new URLSearchParams({email:email}),
        {
            credentials: "include"
        }
        );
        if(!response.ok){
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return false;
        }
        const data = await response.json();
        localStorage.setItem("ph_no", data.ph_no);
        localStorage.setItem("wa_no", data.wa_no);
        return data;
    }catch(error){
        console.log(error);
        return false;
    }
}