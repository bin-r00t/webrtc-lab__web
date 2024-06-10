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

export default function Actions() {
  return (
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
  );
}