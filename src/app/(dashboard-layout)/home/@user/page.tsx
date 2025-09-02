import React from "react";
import ConcertCard from "@/modules/concerts/shared/components/ConcertCard";
import "./user-home.css";

const UserHomePage = () => {
    // Mock data for concerts
    const concerts = [
        {
            id: "1",
            name: "Concert Name",
            description: "Magna id amet nisi et dolor et.",
            seat: 500,
        },
        {
            id: "2",
            name: "Concert Name",
            description: "Ut enim nulla fugiat quis ipsum nisi aute nostrud occaecat elit.",
            seat: 2000,
        },
    ];

    return (
        <div className="user-home">
            <div className="concerts-list">
                {concerts.map((concert, index) => (
                    <ConcertCard
                        key={concert.id}
                        id={concert.id}
                        name={concert.name}
                        description={concert.description}
                        seat={concert.seat}
                        actions={
                            index === 0 ? (
                                <button className="btn btn-cancel">Cancel</button>
                            ) : (
                                <button className="btn btn-reserve">Reserve</button>
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default UserHomePage;
