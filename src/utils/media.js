/* video refs can be connected throught Context */

// variables - those variables cannot be put into redux
// let remoteStream = null;
let peerConnection = null;
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
  peerConnection = pc;
}
