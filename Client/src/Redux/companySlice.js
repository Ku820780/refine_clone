import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EVENT_API_END_POINT } from "../utils/EndPoints";

export const fetchAllEvent = createAsyncThunk(
  "companies/fetchAllEvent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${EVENT_API_END_POINT}/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState: {
    allCompany: [],
    allContact: [],
    allEvent: [],
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAllCompany: (state, action) => {
      state.allCompany = action.payload;
    },
    setAllContact: (state, action) => {
      state.allContact = action.payload;
    },
    removeContact: (state, action) => {
      state.allContact = state.allContact.filter(
        (contact) => contact._id !== action.payload
      );
    },
    setAllEvent: (state, action) => {
      state.allEvent = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    updateContactStatus: (state, action) => {
      const { id, status } = action.payload;
      const contactIndex = state.allContact.findIndex(
        (contact) => contact._id === id
      );
      if (contactIndex !== -1) {
        state.allContact[contactIndex].status = status;
      }
    },
    updateCompanyDetails: (state, action) => {
      const { id, updatedData } = action.payload;
      const companyIndex = state.allCompany.findIndex(
        (company) => company._id === id
      );
      if (companyIndex !== -1) {
        state.allCompany[companyIndex] = {
          ...state.allCompany[companyIndex],
          ...updatedData,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allEvent = action.payload;
      })
      .addCase(fetchAllEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setAllCompany,
  setAllContact,
  removeContact,
  setAllEvent,
  setTotalPages,
  updateContactStatus,
  updateCompanyDetails,
} = companySlice.actions;

export default companySlice.reducer;
