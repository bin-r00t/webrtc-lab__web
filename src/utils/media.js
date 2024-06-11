/* video refs can be connected throught Context */

// variables - those variables cannot be put into redux
// let remoteStream = null;
export let peerConnection = null;
let localStream = null;
let remoteStreams = [];

// methods
export function getStream(source) {
  switch (source) {
    case "local":
      return localStream;
    case "remote":
      return remoteStreams[0];
    default:
      return null;
  }
}

export function setStream(source, stream) {
  switch (source) {
    case "local":
      localStream = stream;
      break;
    case "remote":
      remoteStreams.length = 0;
      remoteStreams.push(stream);
      break;
    default:
      return null;
  }
}

export function setPeerConnection(pc) {
  console.log("setPeerConnection", pc);
  peerConnection = pc;
}

export async function createOffer() {
  if (peerConnection) {
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);
    console.log("setLocalDescription", offer);
    return offer;
  }
  console.log("peerConnection is NULL");
  return null;
}
