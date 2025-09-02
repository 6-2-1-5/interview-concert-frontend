import React from "react";
import "./StatCard.css";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: "blue" | "green" | "red";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <div className={`stat-card stat-card-${color}`}>
            <div className="stat-card-icon">{icon}</div>
            <div className="stat-card-content">
                <div className="stat-card-title">{title}</div>
                <div className="stat-card-value">{value}</div>
            </div>
        </div>
    );
};

export default StatCard;
