"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSocket = configureSocket;
const roomController_1 = require("../controllers/roomController");
function configureSocket(io) {
    const roomNamespace = io.of('/room');
    roomNamespace.on('connection', (socket) => {
        console.log(`New client connected to room namespace: ${socket.id}`);
        (0, roomController_1.handleRoomEvents)(socket);
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
