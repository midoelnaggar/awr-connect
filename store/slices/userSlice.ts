import { errorMessages } from '@/helpers';
import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { Toast } from 'toastify-react-native';
import api from '../api';

interface IInitialState {
    loading: boolean;
    userDetails: User | null
}

const initialState: IInitialState = {
    loading: false,
    userDetails: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state = initialState;
            return state;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(api.endpoints.getUser.matchPending, state => {
            state.loading = true;
        });
        builder.addMatcher(api.endpoints.getUser.matchFulfilled, (state, action) => {
            if (action.payload.role === "VENDOR") {
                state.userDetails = action.payload || null;
            } else {
                Toast.error(errorMessages["403"],"bottom")
            }
            state.loading = false;
        });
        builder.addMatcher(api.endpoints.getUser.matchRejected, state => {
            state.loading = false;
        });
    }
});

export const { logout } = userSlice.actions;

export default userSlice;
