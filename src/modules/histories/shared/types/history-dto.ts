export type CreateHistoryDto = {
    userId: number;
    concertId: number;
    action: "reserve" | "cancel";
};

export interface RelationHistoryDto {
    id: number;
    user: {
        name: string;
    };
    concert: {
        name: string;
    };
    action: string;
    createdAt: string;
}
