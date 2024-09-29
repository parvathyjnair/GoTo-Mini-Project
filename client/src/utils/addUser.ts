import profile_interface from "../types/profile_interface";

export default async function addUser(jwt: string, setProfile: React.Dispatch<React.SetStateAction<profile_interface | undefined>>) {
    try{
        let serverURL = process.env.REACT_APP_SERVER_URL;
        const res = await fetch(serverURL+'/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jwt }),
        });

        const data = await res.json();

        if(data.profile){
            localStorage.setItem('profile', JSON.stringify(data.profile));
            setProfile(data.profile);
            return true;
        }

        return false;
    }catch(err){
        console.log(err);
        return false;
    }
}