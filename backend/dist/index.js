"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./config/socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Server is running');
});
// Configure Socket.io namespaces and events
(0, socket_1.configureSocket)(io);
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
