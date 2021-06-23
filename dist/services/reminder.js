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
exports.ReminderService = void 0;
const typedi_1 = require("typedi");
const scheduler_1 = require("../scheduler");
let ReminderService = class ReminderService {
    scheduler;
    constructor(scheduler) {
        this.scheduler = scheduler;
    }
    async createReminder(reminder) {
        await this.scheduler.schedule(reminder.target, reminder);
    }
};
ReminderService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [scheduler_1.Scheduler])
], ReminderService);
exports.ReminderService = ReminderService;
