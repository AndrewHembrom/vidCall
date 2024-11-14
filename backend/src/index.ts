import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { configureSocket } from './config/socket';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Configure Socket.io namespaces and events
configureSocket(io);

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
