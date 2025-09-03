import { fetchHistoryList, fetchMyHistoryList } from "./shared/history-api";
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

    async getMyHistory(): Promise<RelationHistoryDto[]> {
        try {
            return await fetchMyHistoryList();
        } catch (error) {
            console.error("Error fetching my history:", error);
            throw new Error("Failed to load my history");
        }
    }
}

export const historyService = new HistoryService();
