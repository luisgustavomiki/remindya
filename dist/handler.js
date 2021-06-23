"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const typedi_1 = require("typedi");
const ws_1 = __importDefault(require("ws"));
let Handler = class Handler {
    port;
    wss;
    actions;
    constructor() {
        this.port = 8080;
        this.actions = new Map();
    }
    boostrap() {
        this.wss = new ws_1.default.Server({ port: this.port });
        this.wss.on('connection', this.connection.bind(this));
    }
    action(action, cb) {
        this.actions.set(action, cb);
    }
    connection(ws) {
        console.log('new connection! yay!');
        ws.on('message', (data) => this.message(ws, data));
    }
    message(_ws, data) {
        console.log('new message: %s', data);
        const payload = JSON.parse(data.toString());
        const cb = this.actions.get(payload.action);
        if (cb) {
            cb(payload.body);
        }
    }
};
Handler = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], Handler);
exports.Handler = Handler;
