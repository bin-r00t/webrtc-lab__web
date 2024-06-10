import { configureStore, createSlice } from "@reduxjs/toolkit";

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    localStream: null,
    remoteStreams: [],
  },
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    addRemoteStream: (state, action) => {
      state.remoteStreams.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    media: mediaSlice.reducer,
  },
});

export default store;
export const { setLocalStream, addRemoteStream } = mediaSlice.actions;
