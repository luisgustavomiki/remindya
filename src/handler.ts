import { Service } from 'typedi';
import WebSocket from 'ws';

@Service()
export class Handler {
  public readonly port: number;
  private wss?: WebSocket.Server;
  private actions: Map<string, (...args: unknown[]) => unknown>;

  constructor() {
    this.port = 8080;
    this.actions = new Map();
  }

  boostrap(): void {
    this.wss = new WebSocket.Server({ port: this.port });
    this.wss.on('connection', this.connection.bind(this));
  }

  action(action: string, cb: (...args: unknown[]) => unknown): void {
    this.actions.set(action, cb);
  }

  private connection(ws: WebSocket): void {
    console.log('new connection! yay!');
    ws.on('message', (data) => this.message(ws, data));
  }

  private message(_ws: WebSocket, data: WebSocket.Data): void {
    console.log('new message: %s', data);

    const payload = JSON.parse(data.toString());
    const cb = this.actions.get(payload.action);

    if (cb) {
      cb(payload.body);
    }
  }
}
