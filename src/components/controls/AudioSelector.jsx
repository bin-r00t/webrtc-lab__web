import { useState } from "react";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setDevice } from "../../store";

export default function AudioSelector({ devices }) {
  const dispatch = useDispatch();
  const { input, output } = devices;
  const [showOptions, setShow] = useState(false);
  // TODO: audioOutputDeviceId 暂时页面上没用到
  const { audioInputDeviceId, audioOutputDeviceId } = useSelector(
    (state) => state.media
  );

  function handleToggleAudio() {
    console.log("start/stop audio");
  }

  function handleChange(e) {
    const deviceId = e.target.value;
    console.log("audio deviceId", deviceId);
    setShow(false);
    dispatch(setDevice({ type: "audio:input", value: deviceId }));
  }

  function handleToggleSelection() {
    setShow((v) => !v);
  }
  return (
    <div className="audio-selector relative">
      <button
        className="w-6 h-6 absolute top-0 right-0 leading-none text-sm text-white"
        onClick={handleToggleSelection}
      >
        ▼
      </button>
      <button
        className="p-2 flex flex-col gap-1 border rounded items-center"
        onClick={handleToggleAudio}
      >
        <MicrophoneIcon className="h-8 w-8 text-white" />
        <span className="text-gray-400 text-xs">Start Audio</span>
      </button>
      {showOptions && (
        <select
          name="audio"
          id="video-devices"
          onChange={handleChange}
          defaultValue={audioInputDeviceId}
          className="absolute -top-6 right-0 translate-x-full"
        >
          <optgroup label="Input Devices">
            {input.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Output Devices">
            {output.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </optgroup>
        </select>
      )}
    </div>
  );
}
