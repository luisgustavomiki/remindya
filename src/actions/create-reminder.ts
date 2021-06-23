import { Service } from 'typedi';
import { Result } from '../interfaces/result';
import { ReminderService } from '../services/reminder';

@Service()
export class CreateReminderAction {
  constructor(private reminderService: ReminderService) {}

  execute(data: unknown): Result {
    const target = new Date((data as any).target as string);
    const message = (data as any).message as string;

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
}
