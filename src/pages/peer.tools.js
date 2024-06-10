function sendOfferToPeer(socket, offer) {
  console.log("Sending offer to peer");
  socket.emit("offer", { offer });
}

function sendAnswerToPeer(socket, answer) {
  console.log("Sending answer to peer");
  socket.emit("answer", { answer });
}

function sendIceCandidateToPeer(socket, iceCandidate) {
  console.log("Sending ICE candidate to peer");
  socket.emit("ice-candidate", { iceCandidate });
}

function receiveOffer(socket, offer, peerConnection) {
  console.log("Receiving offer from peer");
  peerConnection.setRemoteDescription(offer);
}

function receiveAnswer(socket, answer, peerConnection) {
  console.log("Receiving answer from peer");
  peerConnection.setRemoteDescription(answer);
}

export async function initWebRtc(selfVideo) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true,
  });
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
  };
  selfVideo.ref.current.srcObject = selfVideo.stream = stream;
  const peerConnection = new RTCPeerConnection(configuration);
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      console.log("iceCandidate", event.candidate);
    }
  });
  // const offer = await peerConnection.createOffer();
  // peerConnection.setLocalDescription(offer);
  return peerConnection;
}
