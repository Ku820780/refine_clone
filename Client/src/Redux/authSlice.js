import { createSlice } from "@reduxjs/toolkit";

// Get the user from localStorage if available
const userFromLocalStorage = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromLocalStorage, // Initialize user from localStorage
    allUser: [],
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        // Save user to localStorage on login
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        // Remove user from localStorage on logout
        localStorage.removeItem("user");
      }
    },
    setAllUser: (state, action) => {
      console.log('Setting all users:', action.payload); // Debugging the action payload
      state.allUser = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setUser, setAllUser,setTotalPages,setCurrentPage } = authSlice.actions;
export default authSlice.reducer;
