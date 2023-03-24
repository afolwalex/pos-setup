import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {displayError} from '../error';
import {agentDetails} from '../types';
import basicService from './basicService';

const initialState = {
    agent_details: agentDetails,
    loading: false,
    error: '',
};

// Login Agent
export const loginAgent = createAsyncThunk(
    'basic/login',
    async (data: any, thunkAPI) => {
        try {
            const res = await basicService.loginAgent(data);
            return res;
        } catch (error) {
            const message: string = displayError(error, true);
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const basicSlice = createSlice({
    name: 'basic',
    initialState,
    reducers: {
        logout: state => {
            state.agent_details = {};
            state.error = '';
            state.loading = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginAgent.pending, state => {
            state.loading = true;
        });
        builder.addCase(loginAgent.fulfilled, (state, action) => {
            state.loading = false;
            state.agent_details = action.payload;
        });
        builder.addCase(loginAgent.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Error has Occured';
        });
    },
});

export const {logout} = basicSlice.actions;

export default basicSlice.reducer;
