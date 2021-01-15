import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from 'app/utils/api';

const initialState = {
  selectedListing: {}
};

export const fetchListingDetails = createAsyncThunk('lising/fetchListingDetails', async (id, _thunkAPI) => {
  const response = await api.get(`/listing/${id}`);
  return response.data?.listing;
});

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListingDetails.fulfilled]: (state, action) => {
      state.selectedListing = action.payload;
    },
    [fetchListingDetails.rejected]: (state, _action) => {
      state.selectedListing = {};
    }
  }
});

export const selectedListingSelector = state => state.listing.selectedListing;

export default listingSlice.reducer;
