import { Server } from "socket.io";
import { handleRoomEvents } from "../controllers/roomController";

export function configureSocket(io: Server) {
    const roomNamespace = io.of('/room');

    roomNamespace.on('connection', (socket) => {
        console.log(`New client connected to room namespace: ${socket.id}`);

        handleRoomEvents(socket);

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    })
}
