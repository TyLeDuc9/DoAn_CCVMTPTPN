import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/userType";
import { getMeUser, updateUser, changePassword } from "./userThunk";

interface UserState {
  userProfile: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null; // dùng để lưu thông báo thành công
}

const initialState: UserState = {
  userProfile: null,
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userProfile = action.payload;
    },
    logoutProfile: (state) => {
      state.userProfile = null;
    },
    clearMessage: (state) => {
      state.successMessage = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // GET ME
      .addCase(getMeUser.pending, (state) => { state.loading = true; })
      .addCase(getMeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getMeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => { state.loading = true; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.successMessage = "Cập nhật thông tin thành công";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => { state.loading = true; state.successMessage = null; state.error = null; })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // "Đổi mật khẩu thành công"
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logoutProfile, clearMessage } = userSlice.actions;
export default userSlice.reducer;