"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = __importDefault(require("typedi"));
const create_reminder_1 = require("./actions/create-reminder");
const handler_1 = require("./handler");
const scheduler_1 = require("./scheduler");
(async function bootstrap() {
    const handler = typedi_1.default.get(handler_1.Handler);
    handler.boostrap();
    const scheduler = typedi_1.default.get(scheduler_1.Scheduler);
    await scheduler.bootstrap();
    handler.action('create-reminder', typedi_1.default.get(create_reminder_1.CreateReminderAction).execute);
})();
