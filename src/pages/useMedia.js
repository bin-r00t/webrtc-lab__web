import { useState } from "react";

function useMedia() {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setMediaStream(mediaStream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }, []);

  return mediaStream;
}

async function requireUserMedia(options) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("getUserMedia is not supported by your browser");
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia(options);
}

export default useMedia;

// const socket = {};
// socket.on('connect', handleConnected);
// socket.on('disconnect', handleDisconnected);
// socket.on('error', handleError);
// socket.on('room:join', handleJoinRoom);
// socket.on('room:leave', handleLeaveRoom);
// socket.on('room:message', handleMessage);
// socket.on('user:join', handleUserJoin);
// socket.on('user:leave', handleUserLeave);
// socket.on('offer', handleOffer);
// socket.on('answer', handleAnwser);
// socket.on('candidate', handleCandidate);
