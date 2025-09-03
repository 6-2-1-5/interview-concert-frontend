import { Concert } from "./types/concert-entity";
import { CreateConcertDto, GetConcertWithReservationDto } from "./types/concert-dto";
import { getHeaders } from "../../../shared/utils/headers";

export const fetchConcertList = async (): Promise<Concert[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`, {
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch concerts");
    }
    const data = await response.json();
    return data;
};

export const createConcert = async (concertData: CreateConcertDto): Promise<Concert> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(concertData),
    });
    if (!response.ok) {
        throw new Error("Failed to create concert");
    }
    const data = await response.json();
    return data;
};

export const deleteConcert = async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to delete concert");
    }
    const data = await response.json();
    return data;
};

export const fetchConcertsWithReservationStatus = async (): Promise<GetConcertWithReservationDto[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts/user`, {
        method: "GET",
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch concerts with reservation status");
    }
    const data = await response.json();
    return data;
};
