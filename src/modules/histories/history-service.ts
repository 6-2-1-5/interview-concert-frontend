import { fetchHistoryList } from "./shared/history-api";
import { RelationHistoryDto } from "./shared/types/history-dto";

export class HistoryService {
    async getAllHistory(): Promise<RelationHistoryDto[]> {
        try {
            return await fetchHistoryList();
        } catch (error) {
            console.error("Error fetching history:", error);
            throw new Error("Failed to load history");
        }
    }
}

export const historyService = new HistoryService();
