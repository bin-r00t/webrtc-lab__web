import { useEffect, useState } from "react";
import { setPeerConnection, setStream, peerConnection } from "../utils/media";
import { useSelector } from "react-redux";

const configuration = {
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
  // sdpSemantics: "plan-b",
};

function useMedia(videoRef, socket) {
  console.log("[useMedia] socket--", socket);
  const { role, offer } = useSelector((state) => state.media);

  useEffect(() => {
    if (offer) {
      console.log("[useMedia] Emit offer...", offer);
      if (socket.current) {
        socket.current.emit("offer", offer);
      } else {
        console.log("[useMedia] Socket Cannot Emit, because it is NULL...");
      }
    }
  }, [offer]);

  useEffect(() => {
    const initPeerConnection = async () => {
      if (peerConnection == null) {
        console.log("create total new peer connection....");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          // audio: true,
        });

        // save local stream
        videoRef.current.srcObject = stream;
        setStream(stream);

        // create peer connection
        const peerConnection = new RTCPeerConnection(configuration);
        // add tracks
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        // save peer connection
        setPeerConnection(peerConnection);
      }

      function onCandidate(event) {
        if (event.candidate) {
          console.log("iceCandidate", event.candidate);
          // emit candidate
          socket.current.emit(
            `candidate::${role == "" ? "initiator" : role}`,
            event.candidate
          );
        }
      }
      console.log("[useMedia] set onCandidate...");
      peerConnection.onicecandidate = onCandidate;
      // peerConnection.addEventListener("icecandidate", (event) => {
      //   if (event.candidate) {
      //     console.log("iceCandidate", event.candidate);
      //     // emit candidate
      //     socket.emit(
      //       `candidate::${role == "" ? "initiator" : role}`,
      //       event.candidate
      //     );
      //   }
      // });
    };
    initPeerConnection();
  }, [role, socket]);
}

export default useMedia;
