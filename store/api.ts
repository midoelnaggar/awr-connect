import { apiBaseUrl } from '@/constants/api';
import { errorMessages } from '@/helpers';
import { TripListItemResponse, TripResponse, User } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Toast } from 'toastify-react-native';

const baseQuery = fetchBaseQuery({
    baseUrl: apiBaseUrl
});

const baseQueryWithErrorHandler: typeof baseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error?.status) {
        Toast.error(errorMessages[result.error.status], "bottom")
    }
    return result;
};

const api = createApi({
    baseQuery: baseQueryWithErrorHandler,
    endpoints: builder => ({
        getUser: builder.query<User, { email: string }>({
            query: ({ email }) => `/api/users/${email}`,
            keepUnusedDataFor: 0,
        }),
        getMyTrips: builder.query<TripListItemResponse[], { driverId: string }>({
            query: ({ driverId }) => `/api/trips?driverId=${driverId}`,
            keepUnusedDataFor: 0,
        }),
        getTrip: builder.query<TripResponse, { id: string }>({
            query: ({ id }) => `/api/trips/${id}`,
            keepUnusedDataFor: 0,
        }),
        startTrip: builder.mutation<{ message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/api/trips/${id}/start`,
                method: "PATCH",
            }),

        }),
        endTrip: builder.mutation<{ message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/api/trips/${id}/end`,
                method: "PATCH",
            }),

        }),
        cancelTrip: builder.mutation<{ message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/api/trips/${id}/cancel`,
                method: "PATCH",
            }),

        }),
        sendTripLocation: builder.mutation<{ message: string }, { id: string, latitude: number, longitude: number }>({
            query: ({ id, longitude, latitude }) => ({
                url: `/api/trips/${id}/location`,
                method: "POST",
                body: {
                    longitude,
                    latitude
                }
            }),

        }),
    })
})

export const {
    useLazyGetUserQuery,
    useLazyGetMyTripsQuery,
    useLazyGetTripQuery,
    useStartTripMutation,
    useEndTripMutation,
    useCancelTripMutation,
    useSendTripLocationMutation,
} = api


export default api;
