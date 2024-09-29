import InfoCard from "../components/InfoCard"
import { useNavigate } from "react-router-dom";
import "../styles/homePageStyle.css"

export default function HomePage({name}: {name:string}) {
    const navigate = useNavigate();
    return (
        <>
            <InfoCard content={`Hello ${name}, let's find you a worthy companion!`} />
            <div className="center-btn">
                <button onClick={()=>navigate("/selectDestination")}>Get Started!</button>
            </div>
            <InfoCard content="Tip: You can search for your destination or add a new one if it's not available." />
        </>
    )
}