import { getHeaders } from "../../../shared/utils/headers";
import { Concert } from "../../concerts/shared/types/concert-entity";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const reserveSeat = async (concertId: number): Promise<Concert> => {
    const response = await fetch(`${API_BASE_URL}/reservations/${concertId}/reserve`, {
        method: "PATCH",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to reserve seat: ${response.statusText}`);
    }

    return response.json();
};

export const unreserveSeat = async (concertId: number): Promise<Concert> => {
    const response = await fetch(`${API_BASE_URL}/reservations/${concertId}/unreserve`, {
        method: "PATCH",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to unreserve seat: ${response.statusText}`);
    }

    return response.json();
};
