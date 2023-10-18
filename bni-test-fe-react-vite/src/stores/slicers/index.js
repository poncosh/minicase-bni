import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export const getInquiryTransaction = createAsyncThunk(
  "transaction/inquiry",
  async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/users/transaction/inquiry`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MINICASE_BNI_TOKEN")}`,
        },
      });

      return data.data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  }
);

export const getPaymentTransaction = createAsyncThunk(
  "transaction/payment",
  async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/users/transaction/payment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MINICASE_BNI_TOKEN")}`,
        },
      });

      return data.data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  }
);

export const getDetailTransaction = createAsyncThunk(
  "transaction/detail",
  async (id) => {
    try {
      const { data } = await axios.get(`${baseUrl}/users/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MINICASE_BNI_TOKEN")}`,
        },
      });

      return data.data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  }
);

export const contentSlice = createSlice({
  name: "transaction",
  initialState: {
    isLoading: false,
    inquiries: [],
    payments: [],
    detailTransaction: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInquiryTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInquiryTransaction.fulfilled, (state, { payload }) => {
        state.inquiries = payload;
        state.isLoading = false;
      })
      .addCase(getPaymentTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentTransaction.fulfilled, (state, { payload }) => {
        state.payments = payload;
        state.isLoading = false;
      })
      .addCase(getDetailTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailTransaction.fulfilled, (state, { payload }) => {
        state.detailTransaction = payload;
        state.isLoading = false;
      });
  },
});

export default contentSlice.reducer;
