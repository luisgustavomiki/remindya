import { Service } from 'typedi';
import { Reminder } from '../interfaces/reminder';
import { Scheduler } from '../scheduler';

@Service()
export class ReminderService {
  constructor(private scheduler: Scheduler) {}

  async createReminder(reminder: Reminder): Promise<void> {
    await this.scheduler.schedule(reminder.target, reminder);
  }
}
