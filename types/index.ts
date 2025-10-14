export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    VENDOR = 'VENDOR',
    AWR_TEAM = 'AWR_TEAM'
}

export interface TripListItemResponse extends Trip {
    vehiclePlateNumber: string;
    vehicleModel: string | null;
}

export interface TripResponse extends Trip {
    vehicle: Vehicle;
    driver: User;
    locationPoints: LocationUpdate[]
}

export type ErrorType =
    | number
    | 'FETCH_ERROR'
    | 'PARSING_ERROR'
    | 'TIMEOUT_ERROR'
    | 'CUSTOM_ERROR';


export interface Trip {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: TripStatus;
    vehicleId: string;
    driverId: string | null;
    startLocation: string;
    endLocation: string;
    startedAt: Date | null;
    endedAt: Date | null;
}

export enum TripStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
};

export interface Vehicle {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    plateNumber: string;
    model: string | null;
    vendorId: string | null;
}

export interface LocationUpdate {
    id: string;
    tripId: string;
    latitude: number;
    longitude: number;
    speed: number | null;
    timestamp: Date;
}