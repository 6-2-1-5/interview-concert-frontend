import { getHeaders } from "../../../shared/utils/headers";
import { RelationHistoryDto } from "./types/history-dto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const fetchHistoryList = async (): Promise<RelationHistoryDto[]> => {
    const response = await fetch(`${API_BASE_URL}/histories`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch history: ${response.statusText}`);
    }

    return response.json();
};

export const fetchMyHistoryList = async (): Promise<RelationHistoryDto[]> => {
    const response = await fetch(`${API_BASE_URL}/histories/my-histories`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch my history: ${response.statusText}`);
    }

    return response.json();
};
