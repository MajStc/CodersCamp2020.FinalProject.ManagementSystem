import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from '../../axios/axiosMain';

interface Data {
    projectName: string,
    content: string,
    deadline: string,
}

interface State {
    loading: boolean;
    error: any;
    success: boolean;
}

const initialState: State = {
    loading: false,
    error: null,
    success: false,
}

const updateProjectInfo = createSlice({
    name: "updateProjectInfo",
    initialState,
    reducers: {
        start: (state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        success: (state)=>{
            state.loading = false;
            state.error = null 
            state.success = true;
        },
        failed: (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
    }
})

export const {start, success, failed} = updateProjectInfo.actions;

export const updateProjectInfoFetch = (teamId: string, projectId: string, data: Data) : AppThunk =>  async (dispatch) => {
    dispatch(start());
    await axios.put(`/teams/${teamId}/projects/${projectId}/info`,data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
    .then(res=>{
        dispatch(success());
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState)=> state.updateProjectInfo.loading;
export const selectSuccess = (state:RootState) => state.updateProjectInfo.success;
export const selectError = (state: RootState) => state.updateProjectInfo.error;

export default updateProjectInfo.reducer;