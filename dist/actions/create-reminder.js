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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReminderAction = void 0;
const typedi_1 = require("typedi");
const reminder_1 = require("../services/reminder");
let CreateReminderAction = class CreateReminderAction {
    reminderService;
    constructor(reminderService) {
        this.reminderService = reminderService;
    }
    execute(data) {
        const target = new Date(data.target);
        const message = data.message;
        const now = new Date();
        if (target < now) {
            return { success: false, message: 'Reminder has to target the future.' };
        }
        if (message.length > 150) {
            return { success: false, message: 'Message is too big.' };
        }
        this.reminderService.createReminder({ target, message });
        return { success: true };
    }
};
CreateReminderAction = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [reminder_1.ReminderService])
], CreateReminderAction);
exports.CreateReminderAction = CreateReminderAction;
