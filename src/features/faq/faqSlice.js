import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import faqService from "./faqService";

export const getFaqs = createAsyncThunk("faqs/get-faqs", async (thunkAPI) => {
  try {
    return await faqService.getFaqs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createFaqs = createAsyncThunk(
  "faqs/create-faqs",
  async (faqData, thunkAPI) => {
    try {
      return await faqService.createFaqs(faqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAFaq = createAsyncThunk(
  "faqs/update-faqs",
  async (faq, thunkAPI) => {
    try {
      return await faqService.updateFaqs(faq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAFaq = createAsyncThunk(
  "faqs/delete-faqs",
  async (id, thunkAPI) => {
    try {
      return await faqService.deleteFaqs(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  faqs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const brandSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.faqs = action.payload;
      })
      .addCase(getFaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createFaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createFaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateAFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteAFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
