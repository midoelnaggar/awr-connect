import * as Location from 'expo-location';
import moment from "moment";
import { Toast } from "toastify-react-native";
import { ErrorType, Role, TripStatus } from "../types";


export const isRole = (value: string | null): value is Role => {
    return value ? (["VENDOR", "AWR_TEAM"] as Role[]).includes(value as Role) : false;
};

export const isStatus = (value: string | null): value is TripStatus => {
    return value ? (["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as TripStatus[]).includes(value as TripStatus) : false;
};

export const formatDate = (date: Date | null) => {
    return date ? moment(date).format('MMM DD, YYYY, hh:mm A') : "Not available";
};

export const getStatusColor = (status: TripStatus) => {
    switch (status) {
        case 'IN_PROGRESS':
            return 'blue';
        case 'COMPLETED':
            return 'green';
        case 'CANCELLED':
            return 'red';
        default:
            return 'gray';
    }
};

export const calculateDuration = (start: Date | null, end: Date | null) => {
    const startMoment = moment(start);
    const endMoment = end ? moment(end) : moment();
    const duration = moment.duration(endMoment.diff(startMoment));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    return ((start && end) ? `${hours}h ${minutes}m${!end ? ' (ongoing)' : ''}` : "Not available");
};



export const errorMessages: Record<ErrorType, string> = {
    CUSTOM_ERROR: "Something went wrong. Please try again.",
    FETCH_ERROR: "Unable to reach the server. Check your internet connection.",
    PARSING_ERROR: "Received unexpected data from the server.",
    TIMEOUT_ERROR: "The request timed out. Please try again.",

    "400": "Bad request. Please check your input.",
    "401": "Unauthorized. Please log in.",
    "403": "Access denied. You don't have permission.",
    "404": "Resource not found.",
    "409": "Conflict occurred. Please refresh and try again.",
    "422": "Validation failed. Please check the data.",
    "429": "Too many requests. Please slow down.",
    "500": "Server error. Please try again later.",
    "502": "Bad gateway. Try again shortly.",
    "503": "Service unavailable. Please try again later.",
    "504": "Server timeout. Please retry.",
}

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const getCurrentLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Toast.error('Permission denied, Location permission is required',);
            return null;
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
    } catch (error) {
        console.error('Error getting location:', error);
        Toast.error('Error, Failed to get location');
        return null;
    }
};