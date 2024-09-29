import cron from "node-cron";
import fs from 'fs';


export const fetchOAuthJWKs = async () => {
    console.log('Fetching OAuth JWKs');
    const result = await fetch(`https://accounts.google.com/.well-known/openid-configuration`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const data = await result.json();
    //console.log(data.jwks_uri);

    const result2 = await fetch(data.jwks_uri, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });

    const data2 = await result2.json();
    console.log(data2);

    //update jwk.json

    fs.writeFileSync('jwk.json', JSON.stringify(data2));
}

// schedule a cron job to fetch OAuth JWKs every 24 hours

cron.schedule('0 0 * * *', async () => {
    fetchOAuthJWKs();
},{
    scheduled: true
});