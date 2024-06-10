import { useParams } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import { Modal } from "../../components/Modal";
import VideoWrapper from "./VideoWrapper";
import VideoActions from "./Actions";
import { initSocket } from "../../utils/socket";
import { SocketContext } from "../../App";
// import { initWebRtc } from "../peer.tools";
// import { useDispatch, useSelector } from "react-redux";
// import { setPeerConnection } from "../../store/index";

export default function Room() {
  const { socket, saveSocket } = useContext(SocketContext);
  const { roomId } = useParams();
  const dialogRef = useRef();
  const nameRef = useRef();
  const [username, setName] = useState({
    value: "",
    error: null,
  });

  useEffect(() => {
    if (username.value == "") {
      dialogRef.current.open();
    }
    saveSocket(initSocket("https://10.168.1.141:8000", { token: roomId }));

    // async function prepare() {
    //   const peerConnection = await initWebRtc();
    //   dispatch(setPeerConnection(peerConnection));
    // }
    // prepare();
  }, []);

  function handleSetName() {
    const name = nameRef.current.value;
    if (!name) {
      setName((prev) => ({
        ...prev,
        error: true,
      }));
      return;
    }
    setName(() => ({ error: null, value: name }));
    dialogRef.current.close();
    //
    if (socket.current) {
      socket.current.emit("user:setName", name);
    }
  }

  return (
    <>
      <div className="room h-full bg-gray-800 text-white flex flex-col">
        <div className="tool-bar flex gap-8 items-center">
          <h1 className="p-5 rounded flex gap-5 text-gray-400">
            <strong>当前房间: </strong>
            <span>{roomId}</span>
          </h1>
          <h1 className="p-5 rounded flex gap-5 text-gray-400">
            <strong>你的名字: </strong>
            <span>{username.value}</span>
          </h1>
        </div>
        <VideoWrapper socket={socket} />
        <VideoActions />
      </div>
      <Modal
        ref={dialogRef}
        show={!username.value}
        className="fixed min-w-96 flex flex-col gap-5"
      >
        <h1 className="text-xl select-none">给自己取一个好听的名字吧!</h1>
        <div className="flex flex-col gap-3">
          <input
            ref={nameRef}
            type="text"
            className="p-2 rounded-lg outline-none bg-gray-100 text-gray-700"
          />
          {username.error && (
            <p className="error-msg text-xs text-red-500">* 来将请留下姓名</p>
          )}
        </div>
        <div className="btn-group text-right">
          <button
            onClick={handleSetName}
            className="bg-indigo-500 text-white p-2 px-7 rounded-3xl transition hover:bg-indigo-400"
          >
            就它了!
          </button>
        </div>
      </Modal>
    </>
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
