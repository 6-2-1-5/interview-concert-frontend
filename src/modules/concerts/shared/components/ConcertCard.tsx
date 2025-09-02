import React from "react";
import { User } from "lucide-react";
import "./ConcertCard.css";

interface ConcertCardProps {
    id: string;
    name: string;
    description: string;
    seat: number;
    actions?: React.ReactNode;
}

const ConcertCard: React.FC<ConcertCardProps> = ({
    id,
    name,
    description,
    seat,
    actions
}) => {
    return (
        <div className="concert-card">
            <div className="concert-card-header">
                <h3 className="concert-name">{name}</h3>
            </div>
            
            <div className="concert-card-body">
                <p className="concert-description">{description}</p>
                
                <div className="concert-card-footer">
                    <div className="concert-seat">
                        <span className="seat-icon"><User /></span>
                        <span className="seat-text">{seat.toLocaleString()}</span>
                    </div>
                    
                    {actions && (
                        <div className="concert-card-actions">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConcertCard;