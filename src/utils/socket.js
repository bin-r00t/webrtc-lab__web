import { io } from "socket.io-client";

/**
 * 1. c ---> signal server 发现没有房间，创建房间 --> 通知 c1 你是 发起者；若发现有房间，则通知 c 你是加入者，并发送 offer
 * 2. c ---> c是发起者，向 signal server 发送 offer --> signal server 查看房间是否有人，有人则转发 offer，否则存储 offer
 * 3. c ---> c是加入者，向 signal server 发送 answer --> signal server 查看房间是否有人，有人则转发 answer，否则丢弃 answer，并返回 --> 告知失败
 */

export const initSocket = (url, { token }) => {
  const socket = io(url, {
    auth: {
      token,
    },
    // autoConnect: false,
  });

  socket.on("connect", handleConnected);
  socket.on("disconnect", handleDisconnected);
  socket.on("error", handleError);
  socket.on("negotiation::start", handleStartNegotiation.bind(socket));
  socket.on("waiting", handleWaiting.bind(socket));
  return socket;
};

function dispatch(str) {
  return str;
}

function handleConnected() {
  console.log("connected");
}

function handleDisconnected() {
  console.log("disconnect");
}

function handleError(error) {
  console.error("Error", error);
}

function handleJoinRoom(room) {
  console.log("join room", room);
}

function handleStartNegotiation() {
  // <this> is socket instance
  console.log("start negotiation", this);
  // this.emit('offer', { type: 'offer', sdp: 'offer' });
}

function handleWaiting() {
  console.log("waiting");
}
