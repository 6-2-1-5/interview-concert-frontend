"use client";

import React, { useState } from "react";
import { User, Award, CircleX, Trash2 } from "lucide-react";
import StatCard from "@/modules/concerts/shared/components/StatCard";
import TabNavigation from "@/modules/concerts/shared/components/TabNavigation";
import ConcertCard from "@/modules/concerts/shared/components/ConcertCard";
import "./admin-home.css";
import { Concert } from "@/modules/concerts/shared/concert-types";

const AdminHomePage = () => {
    const [selectedConcertId, setSelectedConcertId] = useState<string | null>(null);

    const concerts: Concert[] = [
        {
            id: "1",
            name: "Concert Name 1",
            description: "Pariatur et esse adipisicing in elit in aliqua qui laborum nostrud voluptate pariatur ea cupidatat.",
            seat: 200,
            reservedSeat: 110,
            cancelledSeat: 20,
        },
        {
            id: "2",
            name: "Concert Name 2",
            description: "Sit nulla est anim officia commodo nisi occaecat cupidatat aliqua velit ipsum aliquip dolore.",
            seat: 100,
            reservedSeat: 11,
            cancelledSeat: 8,
        },
        
    ];

    const selectedConcert = selectedConcertId ? concerts.find((c) => c.id === selectedConcertId) : null;
    const totalStats = {
        seat: concerts.reduce((sum, c) => sum + c.seat, 0),
        reservedSeat: concerts.reduce((sum, c) => sum + c.reservedSeat, 0),
        cancelledSeat: concerts.reduce((sum, c) => sum + c.cancelledSeat, 0),
    };

    const displayStats = selectedConcert || totalStats;

    const overviewContent = (
        <div className="concerts-list">
            {concerts.length === 0 ? (
                <div className="empty-state">
                    <p>No concerts. Create your first concert</p>
                </div>
            ) : (
                concerts.map((concert) => (
                    <div
                        key={concert.id}
                        className={`concert-item ${selectedConcertId === concert.id ? "selected" : ""}`}
                        onClick={() => setSelectedConcertId(selectedConcertId === concert.id ? null : concert.id)}
                    >
                        <ConcertCard
                            id={concert.id}
                            name={concert.name}
                            description={concert.description}
                            seat={concert.seat}
                            actions={
                                <button className="btn btn-danger">
                                    <Trash2 size={16} /> Delete
                                </button>
                            }
                        />
                    </div>
                ))
            )}
        </div>
    );

    const createContent = <div></div>;

    const tabs = [
        { id: "overview", label: "Overview", content: overviewContent },
        { id: "create", label: "Create", content: createContent },
    ];

    return (
        <div className="admin-home">
            <div className="stats-grid">
                <StatCard title="Total of seats" value={displayStats.seat.toString()} icon={<User size={24} />} color="blue" />
                <StatCard title="Reserve" value={displayStats.reservedSeat.toString()} icon={<Award size={24} />} color="green" />
                <StatCard title="Cancel" value={displayStats.cancelledSeat.toString()} icon={<CircleX size={24} />} color="red" />
            </div>

            <div className="admin-content">
                <TabNavigation tabs={tabs} defaultActiveTab="overview" />
            </div>
        </div>
    );
};

export default AdminHomePage;
