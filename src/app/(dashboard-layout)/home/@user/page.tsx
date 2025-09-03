"use client";

import React, { useState, useEffect } from "react";
import ConcertCard from "@/modules/concerts/shared/components/ConcertCard";
import { concertService } from "@/modules/concerts/concert-service";
import { GetConcertWithReservationDto } from "@/modules/concerts/shared/types/concert-dto";
import "./user-home.css";

const UserHomePage = () => {
    const [concerts, setConcerts] = useState<GetConcertWithReservationDto[]>([]);

    const fetchConcerts = async () => {
        try {
            const concertData = await concertService.getConcertsWithReservationStatus();
            setConcerts(concertData);
        } catch (err) {
            console.error("Error fetching concerts:", err);
        }
    };

    useEffect(() => {
        fetchConcerts();
    }, []);

    return (
        <div className="user-home">
            <div className="concerts-list">
                {concerts.length === 0 ? (
                    <div className="empty-state">
                        <p>No concerts available</p>
                    </div>
                ) : (
                    concerts.map((concert, index) => (
                        <ConcertCard
                            key={concert.id}
                            id={concert.id}
                            name={concert.name}
                            description={concert.description}
                            seat={concert.seat}
                            actions={
                                concerts[index].isReserved ? (
                                    <button className="btn btn-cancel">Cancel</button>
                                ) : (
                                    <button className="btn btn-reserve">Reserve</button>
                                )
                            }
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default UserHomePage;
