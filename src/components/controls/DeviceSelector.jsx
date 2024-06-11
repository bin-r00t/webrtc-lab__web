import { useEffect, useState } from "react";
import AudioSelector from "./AudioSelector";
import VideoSelector from "./VideoSelector";

export default function DeviceSelector() {
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  useEffect(() => {
    async function initDevices() {
      console.log("[Device Selector] 初始化设备...");
      const { audio, video, audioOutput } = await getDevices();
      setAudioDevices(audio);
      setVideoDevices(video);
      setAudioOutputDevices(audioOutput);
    }
    initDevices();
  }, []);

  return (
    <>
      <AudioSelector
        devices={{ input: audioDevices, output: audioOutputDevices }}
      />
      <VideoSelector devices={videoDevices} />
    </>
  );
}

async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log("devices", devices);
  return {
    audio: devices.filter((device) => device.kind === "audioinput"),
    audioOutput: devices.filter((device) => device.kind === "audiooutput"),
    video: devices.filter((device) => device.kind === "videoinput"),
  };
}
