import { reserveSeat, unreserveSeat } from "./shared/reservation-api";
import { Concert } from "../concerts/shared/types/concert-entity";

export class ReservationService {
    async reserveConcertSeat(concertId: number): Promise<Concert> {
        try {
            return await reserveSeat(concertId);
        } catch (error) {
            console.error(`Error reserving seat for concert ${concertId}:`, error);
            throw new Error("Failed to reserve seat");
        }
    }

    async unreserveConcertSeat(concertId: number): Promise<Concert> {
        try {
            return await unreserveSeat(concertId);
        } catch (error) {
            console.error(`Error unreserving seat for concert ${concertId}:`, error);
            throw new Error("Failed to unreserve seat");
        }
    }
}

export const reservationService = new ReservationService();
