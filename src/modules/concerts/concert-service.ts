import { fetchConcertList, createConcert, deleteConcert, fetchConcertsWithReservationStatus } from "./shared/concert-api";
import { Concert } from "./shared/types/concert-entity";
import { CreateConcertDto, GetConcertWithReservationDto } from "./shared/types/concert-dto";

export class ConcertService {
    async getAllConcerts(): Promise<Concert[]> {
        try {
            return await fetchConcertList();
        } catch (error) {
            console.error("Error fetching concerts:", error);
            throw new Error("Failed to load concerts");
        }
    }

    async createNewConcert(concertData: CreateConcertDto): Promise<Concert> {
        try {
            return await createConcert(concertData);
        } catch (error) {
            console.error("Error creating concert:", error);
            throw new Error("Failed to create concert");
        }
    }

    async removeConcert(id: string): Promise<{ message: string }> {
        try {
            return await deleteConcert(id);
        } catch (error) {
            console.error(`Error deleting concert ${id}:`, error);
            throw new Error("Failed to delete concert");
        }
    }

    async getConcertsWithReservationStatus(): Promise<GetConcertWithReservationDto[]> {
        try {
            return await fetchConcertsWithReservationStatus();
        } catch (error) {
            console.error("Error fetching concert with reservation:", error);
            throw new Error("Failed to load concerts with reservation");
        }
    }
}
export const concertService = new ConcertService();
