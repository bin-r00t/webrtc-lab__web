import { CameraIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDevice } from "../../store";

export default function VideoSelector({ devices }) {
  const dispatch = useDispatch();
  const [showOptions, setShow] = useState(false);
  const { videoDeviceId } = useSelector((state) => state.media);

  function handleChange(e) {
    console.log("start/stop video");
    const deviceId = e.target.value;
    setShow(false);
    dispatch(setDevice({ type: "video", value: deviceId }));
  }

  function handleToggleVideo() {
    console.log("start/stop video");
  }

  function handleToggleSelection() {
    setShow((v) => !v);
  }
  return (
    <div className="video-selector relative">
      <button
        className="w-6 h-6 absolute top-0 right-0 leading-none text-sm text-white"
        onClick={handleToggleSelection}
      >
        ▼
      </button>
      <button
        className="p-2 flex flex-col gap-1 border rounded items-center"
        onClick={handleToggleVideo}
      >
        <CameraIcon className="h-8 w-8 text-white" />
        <span className="text-gray-400 text-xs">Start Video</span>
      </button>
      {showOptions && (
        <select
          name="video"
          id="video-devices"
          defaultValue={videoDeviceId}
          onChange={handleChange}
          className="absolute -top-6 right-0 translate-x-full"
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
