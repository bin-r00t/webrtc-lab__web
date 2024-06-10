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
import { useEffect, useRef, useState } from "react";

export default function Room() {
  const selfVideoRef = useRef();
  const peerVideoRef = useRef();
  const localStream = useRef();
  const remoteStream = useRef();

  useEffect(() => {
    async function setup() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          // audio: true,
        });
        console.log(
          "mediaStream",
          selfVideoRef.current,
          mediaStream.getTracks()[0]
        );
        selfVideoRef.current.srcObject = localStream.current = mediaStream;

        createPeerConnection(mediaStream);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    }

    // setup();
  }, []);

  function togglePlay() {
    selfVideoRef.current.paused
      ? selfVideoRef.current.play()
      : selfVideoRef.current.pause();
  }
  return (
    <section className="main-area flex-1 flex justify-center items-center gap-10">
      <div className="bg-black w-[500px] h-[300px] overflow-hidden relative">
        <video
          id="self-video"
          autoPlay
          ref={selfVideoRef}
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
        <video ref={peerVideoRef} className="bg-blue-200 w-full h-full"></video>
      </div>
    </section>
  );
}
