import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { appRouter, expressMiddleware } from '@muzz/trpc';
import { WebSocketServer } from 'ws';

import {
  applyWSSHandler,
  type CreateWSSContextFnOptions,
} from '@trpc/server/adapters/ws';

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/trpc', expressMiddleware);

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const wsServer = new WebSocketServer({ noServer: true });

wsServer.on('connection', () => {
  console.log(`➕➕ Connection (${wsServer.clients.size})`);
  wsServer.once('close', () => {
    console.log(`➖➖ Connection (${wsServer.clients.size})`);
  });
});

server.on('upgrade', (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (ws) => {
    wsServer.emit('connection', ws, req);
  });
});

const createContext = async (opts: CreateWSSContextFnOptions) => ({});

applyWSSHandler({
  wss: wsServer,
  router: appRouter,
  createContext,
  keepAlive: {
    enabled: true,
    pingMs: 30000,
    pongWaitMs: 5000,
  },
});
