import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axiosMain";
import { AppThunk, RootState } from "../store";

interface Data {
  id: string;
}

interface State {
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: State = {
  loading: false,
  success: false,
  error: null,
};

export const removeTeamMember = createSlice({
  name: "removeTeamMember",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    success: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { start, success, failed } = removeTeamMember.actions;

export const removeMemberFetch = (teamId: string, data: Data): AppThunk => async (
  dispatch
) => {
  dispatch(start());
  axios
    .put(`/teams/${teamId}/removeUser`, data, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(success());
    })
    .catch((err) => {
      dispatch(failed(err));
    });
};

export const selectStart = (state: RootState) => state.removeTeamMember.loading;
export const selectSuccess = (state: RootState) => state.removeTeamMember.success;
export const selectError = (state: RootState) => state.removeTeamMember.error;

export default removeTeamMember.reducer;
