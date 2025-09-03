"use client";

import React, { useState, useEffect } from "react";
import ConcertCard from "@/modules/concerts/shared/components/ConcertCard";
import { concertService } from "@/modules/concerts/concert-service";
import { reservationService } from "@/modules/reservations/reservation-service";
import { GetConcertWithReservationDto } from "@/modules/concerts/shared/types/concert-dto";
import { Toasts } from "@/shared/components/ui/toast/Toast";
import "./user-home.css";

const UserHomePage = () => {
    const [concerts, setConcerts] = useState<GetConcertWithReservationDto[]>([]);
    const [reservingConcertId, setReservingConcertId] = useState<number | null>(null);

    const fetchConcerts = async () => {
        try {
            const concertData = await concertService.getConcertsWithReservationStatus();
            setConcerts(concertData);
        } catch (err) {
            console.error("Error fetching concerts:", err);
        }
    };

    const handleReserve = async (concertId: number) => {
        try {
            setReservingConcertId(concertId);
            await reservationService.reserveConcertSeat(concertId);
            await fetchConcerts();

            Toasts.success("Seat reserved successfully");
        } catch (err) {
            console.error("Error reserving seat:", err);
            Toasts.error(`Failed to reserve seat: ${err instanceof Error ? err.message : "Unknown error"}`);
        } finally {
            setReservingConcertId(null);
        }
    };

    const handleUnreserve = async (concertId: number) => {
        try {
            setReservingConcertId(concertId);
            await reservationService.unreserveConcertSeat(concertId);
            await fetchConcerts();

            Toasts.success("Seat unreserved successfully");
        } catch (err) {
            console.error("Error unreserving seat:", err);
            Toasts.error(`Failed to unreserve seat: ${err instanceof Error ? err.message : "Unknown error"}`);
        } finally {
            setReservingConcertId(null);
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
                                    <button
                                        className="btn btn-cancel"
                                        onClick={() => handleUnreserve(Number(concert.id))}
                                        disabled={reservingConcertId === Number(concert.id)}
                                    >
                                        Cancel
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-reserve"
                                        onClick={() => handleReserve(Number(concert.id))}
                                        disabled={reservingConcertId === Number(concert.id)}
                                    >
                                        Reserve
                                    </button>
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
