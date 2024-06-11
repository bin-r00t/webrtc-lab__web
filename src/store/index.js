import { configureStore, createSlice } from "@reduxjs/toolkit";

// media 相关 API
// getSenders()
// replaceTrack()
// getTracks()
// setSinkId() - change audio output

// Keywords:
// Switching cameras in WebRTC
// https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    videoEnable: false, // 开启视频/关闭视频 (tracks.enable = false)
    audioEnable: false, // 静音/取消静音
    videoDeviceId: "default", // 当前选中的视频设备id
    audioInputDeviceId: "default", // 当前选中的音频输入设备id
    audioOutputDeviceId: "default", // 当前选中的音频输出设备id

    // 用于获取媒体流的约束条件，会随着选择而更新, replaceTrack()
    // 更换tracks的时候，是需要重新negotiation的, 也就是需要重新 createOffer
    constraints: {
      // video: {
      //   width: 1280,
      //   height: 720,
      //   deviceId: { exact: videoDeviceId }
      // },
      audio: true,
      video: true,
    },

    // some object cannot be put in redux...
    localStream: null,
    remoteStreams: [],
    peerConnection: null, // peerConnection 和一些其他对象，或许需要提取到单独的文件了，并在 redux 记录元数据用于触发组件更新
  },
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    addRemoteStream: (state, action) => {
      state.remoteStreams.push(action.payload);
    },
    setDevice(state, action) {
      switch (action.payload.type) {
        case "video":
          state.videoDeviceId = action.payload.value;
          break;
        case "audio:input":
          state.audioInputDeviceId = action.payload.value;
          break;
        case "audio:output":
          state.audioOutputDeviceId = action.payload.value;
          break;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    media: mediaSlice.reducer,
  },
});

export default store;
export const { setLocalStream, addRemoteStream, setDevice } =
  mediaSlice.actions;
