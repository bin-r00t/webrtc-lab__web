import { useParams } from "react-router-dom";
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
import { useEffect, useRef } from "react";

export default function Room() {
  const { roomId } = useParams();
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

    setup();
  }, []);

  function togglePlay() {
    selfVideoRef.current.paused
      ? selfVideoRef.current.play()
      : selfVideoRef.current.pause();
  }
  return (
    <div className="room h-full bg-gray-800 text-white flex flex-col">
      <div className="tool-bar">
        <h1 className="p-5 rounded flex gap-5 text-gray-400">
          <strong>当前房间: </strong>
          <span>{roomId}</span>
        </h1>
      </div>
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
          <video
            ref={peerVideoRef}
            className="bg-blue-200 w-full h-full"
          ></video>
        </div>
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

async function createPeerConnection(localStream) {
  // const peerConnection = new RTCPeerConnection(config);
  // peerConnection.onicecandidate = handleICECandidateEvent;
  // peerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  // peerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
  // peerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
  // peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  // peerConnection.ontrack = handleTrackEvent;
  // return peerConnection;
  let peerConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stunserver.org",
          "stun:stun.voiparound.com",
          "stun:stun.voipbuster.com",
          "stun:stun.voipstunt.com",
          "stun:stun.voxgratia.org",
        ],
      },
    ],
  };

  // 1. Create a new RTCPeerConnection
  let peerConnection = new RTCPeerConnection(peerConfiguration);
  // 2. Add the local stream (media stream) to the peer connection
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
  console.log("Added local stream to peer connection", localStream);
  // 3. Listen for ICE candidates on the local RTCPeerConnection
  peerConnection.addEventListener("icecandidate", (event) => {
    // 这里的 event 是一个 RTCPeerConnectionIceEvent 对象
    // 这里需要通过 socket.io 与 signal server 交换 iceCandidate
    console.log("[*] One ICE candidate is ready!", event.candidate);
    if (event.candidate) {
      console.log("iceCandidate", event.candidate);
    }
  });
  console.log("Created RTCPeerConnection", peerConnection);

  try {
    // 4. Create an offer, take this offer and send it over to the other peer
    const offer = peerConnection.createOffer();
    // offer is eventually an <RTCSessionDescription> object
    console.log("Created offer", offer);
    // 4.1 Set the offer as the local description of the peer connection
    // This will trigger icecandidate event, line138
    peerConnection.setLocalDescription(offer);

    // 5. Set the local description of the peer connection
    console.log("Local description set successfully");
  } catch (error) {
    console.error("Error creating an offer", error);
  }
}
