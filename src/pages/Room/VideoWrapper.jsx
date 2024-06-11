import {
  XMarkIcon,
  SpeakerXMarkIcon,
  PlayIcon,
  PauseIcon,
  NoSymbolIcon,
  MicrophoneIcon,
  EyeSlashIcon,
  EyeIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisVerticalIcon,
  Cog8ToothIcon,
  CloudIcon,
  CloudArrowDownIcon,
  ChatBubbleLeftRightIcon,
  CameraIcon,
  BellIcon,
  BellSlashIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
//
import { useContext } from "react";
import { GlobalContext } from "../../App";
import useMedia from "../../hooks/useMedia";

export default function VideoWrapper({}) {
  const { localVideoRef, remoteVideoRef, socket } = useContext(GlobalContext);
  // 初始化 peer connection
  console.log('[VideoWrapper] ', socket);
  useMedia(localVideoRef, socket);

  function togglePlay() {
    localVideoRef.current.paused
      ? localVideoRef.current.play()
      : localVideoRef.current.pause();
  }
  return (
    <section className="main-area flex-1 flex justify-center items-center gap-10">
      <div className="bg-black w-[500px] h-[300px] overflow-hidden relative">
        <video
          id="self-video"
          autoPlay
          ref={localVideoRef}
          className="bg-blue-200 w-full"
        ></video>
        <button
          onClick={togglePlay}
          className="absolute bottom-2 right-2 w-10 h-10 bg-gray-600 transition hover:bg-gray-300 rounded-full grid place-content-center"
        >
          <PlayIcon className="pl-1 h-5 w-5" />
        </button>
      </div>
      <div className="bg-black w-[500px] h-[300px]">
        <video
          ref={remoteVideoRef}
          className="bg-blue-200 w-full h-full"
        ></video>
      </div>
    </section>
  );
}
