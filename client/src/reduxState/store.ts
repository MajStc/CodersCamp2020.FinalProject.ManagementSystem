import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createUserReducer from "./createUserSlice";
import loginReducer from "./loginSlice";
import settingsReducer from "./settingsSlice";
import sideNavActionReducer from "./sideNavActionSlice";
import sendForgotPassword from "./sendForgotPassword";
import changePasswordLanding from "./changePasswordLoggedOut";
import singleTeamData from "./teamDataSlice";
import singleProjectData from "./projectDataSlice";
import sendVerifyAgain from "./sendVerifyAgain";
import createTeamSlice from "./createTeam";
import handleTeamInvite from "./teamInvites";
import createProjectSlice from './createProject';
import notesData from './notes/fetchNotes';
import notesCreate from './notes/postNote';
import deleteNote from './notes/removeNote';
import changeNote from './notes/editNotes';
import createTask from './tasks/createTask';
import getTasks from './tasks/getTasks';
import getTask from './tasks/getSingleTask';
import deleteTask from './tasks/deleteTask';
import editTask from './tasks/editTask';
import editTaskMembers from './tasks/editTaskMembers';
import commentCreate from './comments/postComment';
import commentsData from './comments/getComments';

import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    login: loginReducer,
    settings: settingsReducer,
    sideNavAction: sideNavActionReducer,
    sendForgotPassword,
    changePasswordLanding,
    singleTeamData,
    sendVerifyAgain,
    singleProjectData,
    createTeamSlice,
    handleTeamInvite,
    createProjectSlice,
    notesData,
    notesCreate,
    deleteNote,
    changeNote,
    createTask,
    getTasks,
    getTask,
    deleteTask,
    editTask,
    editTaskMembers,
    commentCreate,
    commentsData,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
