import jws from "jws-jwk";
import fs from "fs";
import { fetchOAuthJWKs } from "./cronFetchOAuthJWKs.js";

let jwk = {};

const readJWKFile = async () => {
    try{
        jwk = JSON.parse(fs.readFileSync("./jwk.json", "utf8"));
    }catch(e){
        console.log("Error reading jwk.json");
        // console.log(e);
        await fetchOAuthJWKs();
        // jwk = JSON.parse(fs.readFileSync("./jwk.json", "utf8"));
    }
};

await readJWKFile();

fs.watch("./jwk.json", async (eventType, filename) => {
    if (eventType === "change") {
        console.log("jwk.json file has been updated. Reloading...");
        await readJWKFile();
    }
});


const verifyOAuthJWT = async (oauthJWT) => {
    const body = JSON.parse(Buffer.from(oauthJWT.split(".")[1], "base64").toString());
    // console.log(body);

    // console.log(body.aud);
    // console.log(body.iss);
    // console.log(jws.verify(oauthJWT, jwk));

    if( body.aud === process.env.OAUTH_CLIENT_ID && 
        body.iss === 'https://accounts.google.com' 
        // && jws.verify(oauthJWT, jwk) 
    ){
        try{
            jws.verify(oauthJWT, jwk);
            // console.log("JWT verified");
            let userData = {
                email: body.email,
                name: body.name,
                picture: body.picture,
                sub: body.sub,
                given_name: body.given_name
            };
            return userData;
        }
        catch(e){
            console.log("JWT verification failed");
            await fetchOAuthJWKs();
            return false;
        }
        
    }
        
    return false;
}

export default verifyOAuthJWT;