import { Service } from 'typedi';
import { Result } from '../interfaces/result';
import { ReminderService } from '../services/reminder';
import { isDate, isObject, isString } from '../utils/parse';

@Service()
export class CreateReminderHandler {
  constructor(private reminderService: ReminderService) {}

  async execute(data: unknown): Promise<Result> {
    console.info('CreateReminderHandler received payload %o', data);

    if (!isObject(data)) {
      return { success: false, message: 'Invalid payload.' };
    }

    if (!(isString(data['target']) || isDate(data['target']))) {
      return { success: false, message: 'Invalid format for target.' };
    }

    if (isNaN(new Date(data['target']).getTime())) {
      return { success: false, message: 'Invalid target.' };
    }

    if (!isString(data['message'])) {
      return { success: false, message: 'Invalid format for message.' };
    }

    const target = new Date(data['target']);
    const message = data['message'];

    const now = new Date();

    if (target < now) {
      return { success: false, message: 'Reminder has to target the future.' };
    }

    if (message.length > 150) {
      return { success: false, message: 'Message is too big.' };
    }

    console.info('Handler: to create reminder %o.', { target, message });

    try {
      await this.reminderService.create({ target, message });
    } catch (e) {
      console.error(e);
      return { success: false, message: 'Unable to create reminder.' };
    }

    return { success: true };
  }
}
