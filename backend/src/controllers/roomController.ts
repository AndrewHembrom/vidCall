import { Socket } from "socket.io";
import { RoomManager } from "../rooms/RoomManager";

export function handleRoomEvents(socket: Socket) {
    socket.on('join-room', (roomId: string) => {
        RoomManager.joinRoom(roomId, socket);
        socket.to(roomId).emit('user-joined: ', socket.id);
    })

    socket.on('leave-room', (roomId: string) => {
        RoomManager.leaveRoom(roomId, socket);
        socket.to(roomId).emit('user-left: ', socket.id);
    })
}