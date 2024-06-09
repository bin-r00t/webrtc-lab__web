import { useParams } from "react-router-dom";
import {
  XMarkIcon,
  SpeakerXMarkIcon,
  PlayIcon,
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

export default function Room() {
  const { roomId } = useParams();

  return (
    <div className="room h-full bg-gray-800 text-white flex flex-col">
      <div className="tool-bar">
        <h1 className="p-5 rounded flex gap-5 text-gray-400">
          <strong>当前房间: </strong>
          <span>{roomId}</span>
        </h1>
      </div>
      <section className="main-area flex-1 flex justify-center items-center gap-10">
        {/* <video ref={selfVideoRef} src="#"></video>
        <video ref={peerVideoRef} src="#"></video> */}
        <div className="bg-black w-[500px] h-[300px]"></div>
        <div className="bg-black w-[500px] h-[300px]"></div>
      </section>
      <div className="btn-group p-5 flex gap-5 items-center justify-center">
        <button className="record h-16 w-16 shadow-md rounded-full bg-indigo-500 grid place-content-center transition hover:scale-110">
          <ArrowDownTrayIcon className="h-8 w-8" />
        </button>
        <button className="stop h-16 w-16 shadow-md rounded-full bg-red-500 grid place-content-center transition hover:scale-110">
          <XMarkIcon className="h-8 w-8" />
        </button>
        <button className="mute h-16 w-16 shadow-md rounded-full bg-gray-500 grid place-content-center transition hover:scale-110">
          <SpeakerXMarkIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
