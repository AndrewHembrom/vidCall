import { io, Socket } from 'socket.io-client';

const ROOM_NAMESPACE_URL = 'http://localhost:3000/room'; // Replace with your server URL

// Connect to the /room namespace
const socket: Socket = io(ROOM_NAMESPACE_URL, {
    autoConnect: false, // Optional: to control connection manually
});

export default socket;
