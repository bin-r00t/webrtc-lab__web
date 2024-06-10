import { configureStore, createSlice } from "@reduxjs/toolkit";

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    localStream: null,
    remoteStreams: [],
    peerConnection: null,
  },
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    addRemoteStream: (state, action) => {
      state.remoteStreams.push(action.payload);
    },
    setPeerConnection: (state, action) => {
      state.peerConnection = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    media: mediaSlice.reducer,
  },
});

export default store;
export const { setLocalStream, addRemoteStream, setPeerConnection } =
  mediaSlice.actions;
