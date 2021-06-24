/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateReminderHandler } from './create-reminder';

const past = () => new Date(new Date().getTime() - 65536);
const future = () => new Date(new Date().getTime() + 65536);

const longString = () => 'a'.repeat(151);

describe('payload validation', () => {
  test('invalid format', () => {
    const reminderService = jest.fn() as any;
    const h = new CreateReminderHandler(reminderService);
    expect(h.execute({})).resolves.toMatchObject({ success: false });
  });

  test('invalid date', () => {
    const reminderService = jest.fn() as any;
    const h = new CreateReminderHandler(reminderService);
    expect(h.execute({ target: [], message: 'valid message' })).resolves.toMatchObject({ success: false });
    expect(h.execute({ target: 'hello', message: 'valid message' })).resolves.toMatchObject({ success: false });
    expect(h.execute({ target: 0, message: 'valid message' })).resolves.toMatchObject({ success: false });
    expect(h.execute({ target: past(), message: 'valid message' })).resolves.toMatchObject({ success: false });
  });

  test('invalid message', () => {
    const reminderService = jest.fn() as any;
    const h = new CreateReminderHandler(reminderService);
    expect(h.execute({ target: future(), message: [] })).resolves.toMatchObject({ success: false });
    expect(h.execute({ target: future(), message: longString() })).resolves.toMatchObject({ success: false });
  });

  test('valid message', () => {
    const reminderService = { create: jest.fn() } as any;
    const h = new CreateReminderHandler(reminderService);
    expect(h.execute({ target: future(), message: 'needaremindya' })).resolves.toMatchObject({ success: true });
    expect(reminderService.create).toBeCalled();
  });
});
