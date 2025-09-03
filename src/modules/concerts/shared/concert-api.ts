import { Concert } from "./types/concert-entity";
import { CreateConcertDto } from "./types/concert-dto";

export const fetchConcertList = async (): Promise<Concert[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`);
    if (!response.ok) {
        throw new Error("Failed to fetch concerts");
    }
    const data = await response.json();
    return data;
};

export const fetchConcert = async (id: string): Promise<Concert> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts/${id}`);
    if (!response.ok) {
        throw new Error("Concert not found");
    }
    const data = await response.json();
    return data;
};

export const createConcert = async (concertData: CreateConcertDto): Promise<Concert> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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
    });
    if (!response.ok) {
        throw new Error("Failed to delete concert");
    }
    const data = await response.json();
    return data;
};
