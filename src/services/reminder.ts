import { Service } from 'typedi';
import { Socket } from '../wrappers/socket';
import { Reminder } from '../interfaces/reminder';
import { Scheduler } from '../wrappers/scheduler';

@Service()
export class ReminderService {
  constructor(private scheduler: Scheduler, private socket: Socket) {}

  async create(reminder: Reminder): Promise<void> {
    await this.scheduler.schedule(reminder.target, reminder);
  }

  broadcast(reminder: Reminder): void {
    this.socket.broadcast(`Quick reminder ${reminder.message}`);
  }
}
