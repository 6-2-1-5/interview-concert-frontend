import { Concert } from "./concert-entity";

export interface CreateConcertDto {
    name: string;
    description: string;
    seat: number;
}

export interface GetConcertWithReservationDto extends Concert {
    isReserved: boolean;
}
