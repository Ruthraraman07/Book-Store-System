import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // use your machine's IP for real devices

export default socket;
