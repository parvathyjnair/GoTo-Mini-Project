import { useParams } from 'react-router-dom';
import findCompanions from '../utils/findCompanions';
import getSubscriptionObject from '../utils/getSubscriptionObject';
import CompanionCard from '../components/CompanionCard';
import "../styles/companionCardStyle.css";
import travelDetails_interface from '../types/travelDetailsInterface';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InfoCard from '../components/InfoCard';
// import PopupMessage from '../components/Toast';
import { useToast } from '../utils/ToastContext';

const ShowCompanions: React.FC<{ email: string; name: string }> = ({ email, name }) => {
    const location = useLocation();
    useEffect(() => setLoading(true), [location]);

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<travelDetails_interface[] | boolean>([]);
    const [pressed, setPressed] = useState<boolean>(false);
    const { destination, date, time, dir } = useParams();
    const { showToast } = useToast();

    const handleRecommendMates = async () => {
        try {
            showToast("Fetching recommendations...");
            const response = await fetch('serverURL+"/ShowCompanions/destinations', {
                method: 'POST', // Use the appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other necessary headers, such as Authorization if required
                },
                body: JSON.stringify({
                    // Include any data you need to send to the API, such as user details
                    email: email,
                    name: name,
                    destination: destination,
                    date: date,
                    time: time,
                    direction: dir,
                }),
            }); 
            // Handle the API response
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data =  response.json(); // Assuming the API returns JSON data
        showToast("Recommendations fetched successfully!");

        // Do something with the API response, like displaying recommendations
        console.log("API Response:", data);

        // You can update your state here if needed, e.g.,
        // setRecommendations(data);
    } catch (error) {
        showToast("Failed to fetch recommendations.");
        console.error("Error fetching recommendations:", error);
    }
};

            
    if (loading && destination && date && dir && email && time) {
        findCompanions(destination, date, email, name, time, dir).then((val) => {
            if (val === false) {
                showToast("Something went wrong :_(");
            }
            setData(val);
            setLoading(false);
        });
    }

    return (
        <>
            {loading && <InfoCard key={1} content="Loading..." />}

            {!loading && data === false && (
                <InfoCard key={2} content="Something went wrong. Wait for some time or try logging in again" />
            )}

            {!loading && typeof data !== 'boolean' && data.length === 0 && (
                <>
                    <div className="companion-list">
                        <InfoCard content={`Sorry, no companions found for ${destination} as of now`} />
                        {!pressed ? (
                            <>
                                <InfoCard content={`Don't wanna go alone? We'll let you know when there are companions for you ;-)`} />
                                <button
                                    className="getNotified-btn"
                                    onClick={async () => {
                                        let res = await getSubscriptionObject(email);
                                        if (res) {
                                            setPressed(true);
                                            showToast("You will be notified!");
                                        } else showToast("Something went wrong :_(");
                                    }}
                                >
                                    Get Notified!
                                </button>
                            </>
                        ) : (
                            <InfoCard content="You will be notified when there are companions for you." />
                        )}
                        {/* Add the "Recommend Mates" button */}
                        <button className="recommend-btn" onClick={handleRecommendMates}>
                            Recommend your mates?
                        </button>
                    </div>
                </>
            )}

            <div className="companion-list">
                {typeof data !== 'boolean' && data.length > 0 && (
                    <>
                        <InfoCard key={5} content={`You can ${dir === 'true' ? 'return from' : 'go to'} ${destination} with anyone of them...`} />
                        <div className="companion-cards-container">
                            {data.map((item) => (
                                <div className="companion-card" key={item._id}>
                                    <CompanionCard avatar={item.avatar} name={item.name} time={item.time} ph={item.ph_no} wa={item.wa_no} email={item.email} />
                                </div>
                            ))}
                        </div>
                        {!pressed ? (
                            <>
                                <InfoCard key={6} content={`Don't wanna go with them? We'll let you know when there are more companions ;-)`} />
                                <button
                                    className="getNotified-btn"
                                    onClick={async () => {
                                        let res = await getSubscriptionObject(email);
                                        if (res) {
                                            setPressed(true);
                                            showToast("You will be notified!");
                                        } else showToast("Something went wrong :_(");
                                    }}
                                >
                                    Get Notified!
                                </button>
                            </>
                        ) : (
                            <InfoCard key={7} content="You will be notified when there are more companions for you." />
                        )}
                        {/* Add the "Recommend Mates" button here as well */}
                        <button className="recommend-btn" onClick={handleRecommendMates}>
                            Recommend Mates
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default ShowCompanions;
