import { Service } from 'typedi';
import { Result } from '../interfaces/result';
import { ReminderService } from '../services/reminder';
import { isDate, isObject, isString } from '../utils/parse';

@Service()
export class BroadcastReminderHandler {
  constructor(private reminderService: ReminderService) {}

  async execute(data: unknown): Promise<Result> {
    console.info('BroadcastReminderHandler received payload %o', data);

    if (!isObject(data)) {
      return { success: false, message: 'Invalid payload.' };
    }

    if (!(isString(data['target']) || isDate(data['target']))) {
      return { success: false, message: 'Invalid format for target.' };
    }

    if (!isString(data['message'])) {
      return { success: false, message: 'Invalid format for message.' };
    }

    const target = new Date(data['target']);
    const message = data['message'];

    console.info('Handler: to broadcast reminder %o.', { target, message });

    try {
      await this.reminderService.broadcast({ target, message });
    } catch {
      return { success: false, message: 'Unable to broadcast reminder.' };
    }

    return { success: true };
  }
}
