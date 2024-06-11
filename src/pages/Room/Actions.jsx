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
import DeviceSelector from "../../components/controls/DeviceSelector";

export default function Actions() {
  return (
    <div className="btn-group bg-gray-900 shadow-3xl p-5 flex gap-5 items-center justify-between">
      <section className="flex gap-3 items-center text-black">
        <DeviceSelector />
      </section>
      <section className="flex gap-5 items-center justify-center">
        <button className="record h-16 w-16 shadow-md      bg-gray-500  grid place-content-center transition hover:scale-110">
          <ArrowDownTrayIcon className="h-8 w-8" />
        </button>
        <button className="stop h-16 w-16 shadow-md    bg-gray-500    grid place-content-center transition hover:scale-110">
          <XMarkIcon className="h-8 w-8" />
        </button>
        <button className="mute h-16 w-16 shadow-md   bg-gray-500 grid place-content-center transition hover:scale-110">
          <SpeakerXMarkIcon className="h-8 w-8" />
        </button>
      </section>
      <section>
        <button className="exit h-16 px-8 rounded-md transition hover:bg-red-800 bg-red-500 text-white">
          Hang Up
        </button>
      </section>
    </div>
  );
}
