"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoomEvents = handleRoomEvents;
const RoomManager_1 = require("../rooms/RoomManager");
function handleRoomEvents(socket) {
    socket.on('join-room', (roomId) => {
        RoomManager_1.RoomManager.joinRoom(roomId, socket);
        socket.to(roomId).emit('user-joined: ', socket.id);
    });
    socket.on('leave-room', (roomId) => {
        RoomManager_1.RoomManager.leaveRoom(roomId, socket);
        socket.to(roomId).emit('user-left: ', socket.id);
    });
}
