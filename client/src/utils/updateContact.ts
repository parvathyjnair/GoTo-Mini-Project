export default async function updateContact(email: string, ph_no: string, wa_no: string) {
  try{
    if(ph_no==="")  localStorage.removeItem("ph_no");
    else  localStorage.setItem("ph_no", ph_no);
    if(wa_no==="")  localStorage.removeItem("wa_no");
    else  localStorage.setItem("wa_no", wa_no);
    let serverURL = process.env.REACT_APP_SERVER_URL;
    let res = await fetch(serverURL+`/userDetails/updateContact`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, ph_no, wa_no }),
    });
    if (res.status === 200) return true;
    else {
      console.log(res);
      return false;
    }
  }catch(err){
    console.log(err);
    return false;
  }
}