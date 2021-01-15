import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from 'app/utils/api';

const initialState = {
  results: []
};

export const fetchListings = createAsyncThunk('search/fetchListings', async (search, _thunkAPI) => {
  const response = await api.get(`/listing${search}`);
  return response.data?.listings;
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListings.fulfilled]: (state, action) => {
      state.results = action.payload;
    },
    [fetchListings.rejected]: (state, _action) => {
      state.results = [];
    }
  }
});

export const searchResultsSelector = state => state.search.results

export default searchSlice.reducer;
