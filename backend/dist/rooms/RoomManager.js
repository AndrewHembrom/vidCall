"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
class RoomManagerClass {
    constructor() {
        this.rooms = new Map();
    }
    createRoom(roomId) {
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, new Set());
        }
    }
    joinRoom(roomId, socket) {
        var _a;
        this.createRoom(roomId);
        (_a = this.rooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.add(socket.id);
        socket.join(roomId);
    }
    leaveRoom(roomId, socket) {
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
exports.RoomManager = new RoomManagerClass();
