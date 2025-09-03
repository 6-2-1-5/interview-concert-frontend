import { fetchConcertList, fetchConcert, createConcert, deleteConcert } from "./shared/concert-api";
import { Concert } from "./shared/types/concert-entity";
import { CreateConcertDto } from "./shared/types/concert-dto";

export class ConcertService {
    async getAllConcerts(): Promise<Concert[]> {
        try {
            return await fetchConcertList();
        } catch (error) {
            console.error("Error fetching concerts:", error);
            throw new Error("Failed to load concerts");
        }
    }

    async getConcertById(id: string): Promise<Concert> {
        try {
            return await fetchConcert(id);
        } catch (error) {
            console.error(`Error fetching concert ${id}:`, error);
            throw new Error("Concert not found");
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
}
export const concertService = new ConcertService();
