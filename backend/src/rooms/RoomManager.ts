import { Socket } from 'socket.io'

class RoomManagerClass {
    private rooms: Map<string, Set<string>> = new Map();

    createRoom(roomId: string) {
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, new Set());
        }
    }

    joinRoom(roomId: string, socket: Socket) {
        this.createRoom(roomId);
        this.rooms.get(roomId)?.add(socket.id);
        socket.join(roomId);
    }   

    leaveRoom(roomId: string, socket: Socket) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.delete(socket.id);
            socket.leave(roomId);
            if (room.size === 0) {
                this.rooms.delete(roomId);
            }
        }
    }
}

export const RoomManager = new RoomManagerClass();