import { Concert } from "./types/concert-entity";
import { CreateConcertDto } from "./types/concert-dto";

const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    // For this example, we willl check for a user ID in header
    // In a real world, this would come from JWT token or session
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user.id) {
                    headers["user-id"] = user.id;
                }
            } catch (error) {
                console.error("Failed to parse user data for headers:", error);
            }
        }
    }

    return headers;
};

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

export const fetchConcert = async (id: string): Promise<Concert> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concerts/${id}`, {
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error("Concert not found");
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
