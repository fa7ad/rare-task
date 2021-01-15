import { configureStore } from '@reduxjs/toolkit';
import listingSlice from 'features/listing/listingSlice';
import searchSlice from 'features/search/searchSlice';

export default configureStore({
  reducer: {
    search: searchSlice,
    listing: listingSlice
  },
});
