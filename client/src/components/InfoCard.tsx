import infoCardProps from "../types/infoCardProps"
import "../styles/infoCardStyle.css"

export default function InfoCard({content}:infoCardProps){
    return (
        <div className="info-card">
            {content}
        </div>
    )
}