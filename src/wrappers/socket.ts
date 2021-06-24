import { Service } from 'typedi';
import WebSocket from 'ws';

@Service()
export class Socket {
  public readonly port: number;
  private wss?: WebSocket.Server;
  private handlers: Map<string, (...args: unknown[]) => unknown>;

  constructor() {
    this.port = 8080;
    this.handlers = new Map();
  }

  boostrap(): void {
    this.wss = new WebSocket.Server({ port: this.port });
    this.wss.on('connection', this.connection.bind(this));
  }

  addHandler(action: string, cb: (...args: unknown[]) => unknown): void {
    this.handlers.set(action, cb);
  }

  broadcast(data: unknown): void {
    this.wss?.clients.forEach((client) => client.send(data));
  }

  private connection(ws: WebSocket): void {
    console.log('new connection! yay!');
    ws.on('message', (data) => this.message(ws, data));
  }

  private message(_ws: WebSocket, data: WebSocket.Data): void {
    console.log('new message: %s', data);

    try {
      const payload = JSON.parse(data.toString());
      const cb = this.handlers.get(payload.action);

      if (cb) {
        const ret = cb(payload.body);
        console.log(ret);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
